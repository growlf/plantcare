// modes
// 0 = running mode
// 1 = lower thresshold setting
// 2 = upper thresshold setting
input.onButtonPressed(Button.A, function () {
    if (mode == 0) {
        // If running mode, switch to threshold_lower editing
        basic.showLeds(`
            # # # # #
            . # # # .
            . . # . .
            . . . . .
            # # # # #
            `)
        mode = 1
    } else if (mode == 1) {
        // If lower-edit mode, decrease threshold
        threshold_lower = threshold_lower - 5
        led.plotBarGraph(
        threshold_lower,
        700
        )
    } else if (mode == 2) {
        // If upper-edit mode, decrease threshold
        threshold_upper = threshold_upper - 5
        led.plotBarGraph(
        threshold_upper,
        700
        )
    }
})
input.onButtonPressed(Button.AB, function () {
    if (mode != 0) {
        mode = 0
    }
    led.plotBarGraph(
    moisturelvl,
    700
    )
})
input.onButtonPressed(Button.B, function () {
    if (mode == 0) {
        // If running mode, switch to threshold_upper editing
        basic.showLeds(`
            # # # # #
            . . . . .
            . . # . .
            . # # # .
            # # # # #
            `)
        mode = 1
    } else if (mode == 1) {
        // If lower-edit mode, increase threshold
        threshold_lower = threshold_lower + 5
        led.plotBarGraph(
        threshold_lower,
        700
        )
    } else if (mode == 2) {
        // If upper-edit mode, increase threshold
        threshold_upper = threshold_upper + 5
        led.plotBarGraph(
        threshold_upper,
        700
        )
    }
})
let moisturelvl = 0
let mode = 0
let threshold_lower = 0
let threshold_upper = 0
threshold_upper = 600
threshold_lower = 200
basic.forever(function () {
    moisturelvl = pins.analogReadPin(AnalogPin.P0)
    if (mode == 0) {
        if (moisturelvl <= threshold_lower) {
            basic.showIcon(IconNames.Umbrella)
            soundExpression.twinkle.playUntilDone()
        } else {
            led.plotBarGraph(
            moisturelvl,
            700
            )
        }
    }
    basic.pause(5000)
})
