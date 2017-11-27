# REV-BABYLON

## 1. Mover - spheres (2 points) -> ok
For some unknown reason, if there is another mesh with another color, spheres will be rendered the same color (instead of semi-transparent) if that mesh is onscreen.
Ok

## 2. Mover - paintings (3 points)-> going
Needs orientation / use orientation specific mover ?

## 3. Doors (3 points) -> ok
Camera's position is checked every frame in scene's OnEveryFrameTrigger.
Should probably make it check the guide's position too.

## 4. Paintings description (4 points) -> ok
Camera's position is checked every frame in scene's OnEveryFrameTrigger.
Whether the user is looking or not depends on the pointer's position.
Uses OnPointerOverTrigger and OnPointerOutTrigger. Camera needs to be close too.
Would work better if pointer was fixed to the middle of the screen.

## 5. Lift (3 points) -> ok
Camera needs to be in the lift to be able to activate the button.
Camera's collision and gravity doesn't work if there no input from the user, meaning the camera will either stay in the air or pass through the lift.

## 6. Guide (5 points) -> going
Steering needs some improvement (around stair and lift).
Add some sounds.