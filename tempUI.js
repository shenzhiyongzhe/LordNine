const DownLoadApk = (downloadUrl, savePath) =>
{
    threads.start(function ()
    {
        const url = `http://10.6.130.129:82/${downloadUrl}`;
        const fullSavePath = `/sdcard/${savePath}`;

        let r = http.client().newCall(
            http.buildRequest(url, {
                method: "GET",
            })
        ).execute();

        let fs = new java.io.FileOutputStream(fullSavePath);

        let is = r.body().byteStream();
        const buffer = util.java.array("byte", 1024);
        let byteRead; //每次读取的byte数
        while ((byteRead = is.read(buffer)) != -1)
        {
            fs.write(buffer, 0, byteRead); //读取
        }
        if (files.exists(fullSavePath))
        {
            app.viewFile(fullSavePath);
        }
        else
        {
            alert('下载失败');
        }
    }
    );
};
const UpdateScript = () => DownLoadApk("LordNine.apk", "LordNine/LordNine.apk");

