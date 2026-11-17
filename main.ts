namespace SpriteKind {
    export const Collectable = SpriteKind.create();
}

tiles.setCurrentTilemap(tilemap`level`)
let mySprite = sprites.create(assets.image`mySmallBurger`, SpriteKind.Player)
let myEndSprite = sprites.create(assets.image`pedestal`, SpriteKind.Collectable)
sprites.onOverlap(SpriteKind.Player, SpriteKind.Collectable, function(){
    game.gameOver(true)
    game.setGameOverScoringType(game.ScoringType.None)
    game.setGameOverEffect(true, effects.confetti)
})

tiles.placeOnTile(mySprite, tiles.getTileLocation(4, 48))
tiles.placeOnTile(myEndSprite, tiles.getTileLocation(0, 1))
mySprite.ay = 300;
scene.cameraFollowSprite(mySprite)
scaling.scaleToPercent(mySprite, 50)
scaling.scaleToPercent(myEndSprite, 50)
controller.moveSprite(mySprite, 100, 0)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mySprite.isHittingTile(CollisionDirection.Bottom)) {
        mySprite.vy = -200
    } else if (mySprite.isHittingTile(CollisionDirection.Left)) {
        timer.throttle("action", 1000, function() {
            mySprite.vx = 150
            mySprite.vy = -150
            mySprite.sayText("Owee my ankle", 1000)
        })
    } else if (mySprite.isHittingTile(CollisionDirection.Right)) {
        timer.throttle("action", 1000, function () {
            mySprite.vx = -150
            mySprite.vy = -150
            mySprite.sayText("Owee my ankle", 1000)
        })
    }
})

game.splash('Burger Jumper', 'Yes a burger jumps.')
info.startCountdown(30)
info.onCountdownEnd(function(){
    game.gameOver(false)
})

scroller.setLayerImage(1 ,assets.image`myImage`)
scroller.scrollBackgroundWithSpeed(20, 0, 1)
scroller.setBackgroundScrollOffset(0, 0)