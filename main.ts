//  mode
//  0 = running mode
//  1 = lower thresshold setting
//  2 = upper thresshold setting
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    if (mode == 0) {
        mode = 1
    } else if (mode == 1) {
        //  If running, switch to lower threshold editing
        //  If lower-edit mode, decrease threshold
        threshold_lower = threshold_lower - 5
        basic.showNumber(threshold_lower)
    } else if (mode == 2) {
        //  If upper-edit mode, decrease threshold
        threshold_upper = threshold_upper - 5
        basic.showNumber(threshold_upper)
    }
    
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    
    if (mode != 0) {
        mode = 0
    }
    
    basic.showNumber(moisturelvl)
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (mode == 0) {
        mode = 1
    } else if (mode == 1) {
        //  If running, switch to lower threshold editing
        //  If lower-edit mode, increase threshold
        threshold_lower = threshold_lower + 5
        basic.showNumber(threshold_lower)
    } else if (mode == 2) {
        //  If upper-edit mode, increase threshold
        threshold_upper = threshold_upper + 5
        basic.showNumber(threshold_upper)
    }
    
})
let moisturelvl = 0
let mode = 0
let threshold_lower = 0
let threshold_upper = 0
threshold_upper = 400
threshold_lower = 200
basic.forever(function on_forever() {
    
    moisturelvl = pins.analogReadPin(AnalogPin.P0)
    if (moisturelvl <= threshold_lower) {
        basic.showIcon(IconNames.Umbrella)
    } else {
        basic.showIcon(IconNames.House)
        basic.showNumber(moisturelvl)
    }
    
    basic.pause(1000)
})
