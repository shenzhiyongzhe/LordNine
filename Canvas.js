const playerX = device.width / 2;
let playerY = device.height / 2;
let paint = new android.graphics.Paint();

function SkillRange(x, y, color)
{
    this.x = x;
    this.y = y;
    this.color = color;
}
SkillRange.prototype.draw = function (canvas)
{
    paint.setColor(colors.parseColor(this.color));
    paint.setStyle(Paint.Style.STROKE);
    // canvas.drawRect(playerY - 200, playerX - 200, 400, 400, paint);
    canvas.drawLine(playerY, playerX, this.x, this.y, paint);
};

let w = floaty.rawWindow(
    <vertical id="root" bg="#ff0000" gravity="center">
        <canvas id="board"></canvas>
    </vertical>
);
w.setSize(-1, -1);
setInterval(() => { }, 1000);

let skills = [];

for (let i = 0; i < 10; i++)
{
    skills.push(new SkillRange(random(0, 100), random(0, 200), "#ff0000"));
}

setInterval(() =>
{
    let newSkill = [];
    for (let i = 0; i < 10; i++)
    {
        newSkill.push(new SkillRange(random(0, 500), random(0, 500), "#ff0000"));
    }
    skills = newSkill;
});
w.board.on("draw", (canvas) =>
{
    canvas.drawColor(0, android.graphics.PorterDuff.Mode.CLEAR);
    skills.map(skill => skill.draw(canvas));
});
