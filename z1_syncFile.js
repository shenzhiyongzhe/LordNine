const baseUrl = "http://47.76.112.107:8866/";
const ignoreList = [".gitignore", "z_test.js", "z0_tool.js", "z1_syncFile.js", "../", "frame", ".git", ".autojs.sync.ignore"];

const getUrl = (path) =>
{
    path = path || "";
    const res = http.get(baseUrl + path);
    if (res.statusCode !== 200)
    {
        console.log("Error fetching:", path);
        return [];
    }

    const htmlString = res.body.string();
    const result = htmlString.split('\n').map(line =>
    {
        const regex = /<a\s+href="([^"]+)">([^<]+)<\/a>/;
        const match = regex.exec(line);
        if (match)
        {
            const url = match[1];
            const fullPath = path + url; // Construct full path
            return { url, fullPath };
        } else
        {
            return null;
        }
    });

    const filterResult = result.filter(item =>
        item !== null && !ignoreList.includes(item.url)
    );

    let finalResult = [];
    filterResult.forEach(item =>
    {
        if (item.url.endsWith('/'))
        { // If it's a directory
            const directoryPath = item.url; // Remove trailing slash
            const subUrls = getUrl(path + directoryPath);
            finalResult = finalResult.concat(subUrls); // Concatenate arrays
        } else
        {
            finalResult.push(item); // Push single item
        }
    });

    return finalResult;
};

const downloadFile = (url) =>
{
    http.get(`${baseUrl}${url}`, {}, function (res, err)
    {
        if (err)
        {
            console.log(err);
            return;
        }
        files.createWithDirs("/sdcard/脚本/" + url);
        files.writeBytes("/sdcard/脚本/" + url, res.body.bytes());
    });
};
const SyncFile = function ()
{
    const urlList = getUrl();
    for (let i = 0; i < urlList.length; i++)
    {
        downloadFile(urlList[i].fullPath);
    }
    toastLog("同步完成");
};

function getFileUrl(path)
{
    function traverseDirectory(dirPath, fileList)
    {
        fileList = fileList || []
        let names = files.listDir(dirPath);
        names = names.filter(item => !ignoreList.includes(item.toString()))
        names.forEach(file =>
        {
            const filePath = files.join(dirPath, file);
            if (files.isDir(filePath))
            {
                // 如果是文件夹，则递归调用自身
                traverseDirectory(filePath, fileList);
            } else if (files.isFile(filePath))
            {
                // 如果是文件，则添加到文件列表
                fileList.push(filePath);
            }
        });
        return fileList;
    }

    // 检查传入路径是否存在并且是一个有效的文件或目录
    if (!files.exists(path))
    {
        console.error("指定路径不存在");
        return [];
    }

    if (files.isDir(path))
    {
        // 如果是目录，则开始遍历
        return traverseDirectory(path);
    } else if (files.isFile(path))
    {
        return [path];
    } else
    {
        console.error("指定路径既不是文件也不是目录");
        return [];
    }
}
const copyFile = (fileList) =>
{
    fileList.map(item =>
    {
        files.copy(item, item.split('/sdcard/脚本/LordNine/')[1])
    })
}
// 使用示例
const filePaths = getFileUrl("/sdcard/脚本/LordNine/");
copyFile(filePaths)
toastLog('同步成功');




