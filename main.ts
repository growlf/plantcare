let moisturelvl = 0
let threshold = 0
threshold = 200
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    threshold = threshold - 5
    basic.showNumber(threshold)
})
basic.forever(function on_forever() {
    
    moisturelvl = pins.analogReadPin(AnalogPin.P0)
    if (moisturelvl <= threshold) {
        basic.showIcon(IconNames.Umbrella)
    } else {
        basic.showIcon(IconNames.House)
        basic.showNumber(moisturelvl)
    }
    
    basic.pause(1000)
})
