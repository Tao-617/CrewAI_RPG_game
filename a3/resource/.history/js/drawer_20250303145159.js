export class Drawer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    /** 
     * 清空画布
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    /** 
     * 画玩家
     * @param {object} player - 玩家对象
     * @param {Image} spritesheet - 玩家精灵图
     */


    /** 
     * 画敌人
     * @param {array} enemies - 敌人数组
     * @param {Image} spritesheet - 敌人精灵图
     */
   
    /** 
     * 画玩家子弹
     * @param {array} projectiles - 玩家子弹数组
     */
   

    /** 
     * 画敌人子弹
     * @param {array} enemyProjectiles - 敌人子弹数组
     */
   
   
   
     /** 
     * 画血条
     * @param {object} player - 玩家对象
     */
   



    /** 
     * 画分数
     * @param {number} score - 玩家得分
     */



}
