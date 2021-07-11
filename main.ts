//  modes
//  0 = running mode
//  1 = lower thresshold setting
//  2 = upper thresshold setting
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    if (mode == 0) {
        //  If running mode, switch to threshold_lower editing
        basic.showLeds(`
            # # # # #
                        . # # # .
                        . . # . .
                        . . . . .
                        # # # # #
        `)
        mode = 1
    } else if (mode == 1) {
        //  If lower-edit mode, decrease threshold
        threshold_lower = threshold_lower - 5
        led.plotBarGraph(threshold_lower, moisture_max)
    } else if (mode == 2) {
        //  If upper-edit mode, decrease threshold
        threshold_upper = threshold_upper - 5
        led.plotBarGraph(threshold_upper, moisture_max)
    }
    
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    
    if (mode != 0) {
        mode = 0
    }
    
    led.plotBarGraph(moisturelvl, moisture_max)
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (mode == 0) {
        //  If running mode, switch to threshold_upper editing
        basic.showLeds(`
            # # # # #
                        . . . . .
                        . . # . .
                        . # # # .
                        # # # # #
        `)
        mode = 1
    } else if (mode == 1) {
        //  If lower-edit mode, increase threshold
        threshold_lower = threshold_lower + 5
        led.plotBarGraph(threshold_lower, moisture_max)
    } else if (mode == 2) {
        //  If upper-edit mode, increase threshold
        threshold_upper = threshold_upper + 5
        led.plotBarGraph(threshold_upper, moisture_max)
    }
    
})
let moisturelvl = 0
let mode = 0
let moisture_max = 0
let threshold_lower = 0
let threshold_upper = 0
threshold_upper = 600
threshold_lower = 500
moisture_max = 950
let delay_ms = 5000
basic.forever(function on_forever() {
    
    moisturelvl = pins.analogReadPin(AnalogPin.P0)
    if (mode == 0) {
        if (moisturelvl <= threshold_lower) {
            basic.showIcon(IconNames.Umbrella)
            soundExpression.twinkle.playUntilDone()
        } else {
            led.plotBarGraph(moisturelvl, moisture_max)
        }
        
    }
    
    basic.pause(delay_ms)
})
