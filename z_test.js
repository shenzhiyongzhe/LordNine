const CountDownFloaty = (sec) =>
{
    const floatyWindow = floaty.window(
        <card gravity="center|top" alpha="1" cardBackgroundColor="#71c9ce" cardCornerRadius="10">
            <text id="stop" color="#ffffff" w="30" h="30" bg="#71c9ce" marginLeft="85">✕</text>
            <vertical gravity="center|top" >
                <text id="delayTime" h='60' gravity="center" color="#ffffff" textSize="40sp" marginTop="5"></text>
            </vertical>
        </card>
    );

    floatyWindow.setSize(400, 200);
    floatyWindow.setPosition(185, 300);
    floatyWindow.delayTime.setText(`${sec}s`);
    const delayInterval = setInterval(() =>
    {
        ui.run(() =>
        {
            floatyWindow.delayTime.setText(`${sec}s`);
        });
        sec--;
        if (sec <= 0)
        {
            clearInterval(delayInterval);
            floatyWindow.close()
        }
    }, 1000);
}
