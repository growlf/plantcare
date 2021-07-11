// modes
// 0 = constant/curent display
// 1 = lower threshold menu
// 2 = upper threshold menu
input.onButtonPressed(Button.A, function () {
    // When the A button is pressed, either select the lowerthreshold menu mode
    // or decrease the threshold of the mode that is currently selected
    if (mode == 0) {
        // If mode is "running/display", switch to low_threshold editing and display an indicator
        basic.showLeds(`
            # # # # #
            . # # # .
            . . # . .
            . . . . .
            # # # # #
            `)
        mode = 1
        basic.pause(1000)
    } else if (mode == 1) {
        // If lower-edit mode, decrease lower threshold
        low_threshold = low_threshold - 5
        // limit threshold to zero for sanity
        if (low_threshold < 0) {
            low_threshold = 0
        }
    } else if (mode == 2) {
        // If upper-edit mode, decrease upper threshold
        top_threshold = top_threshold - 5
        // Limit threshold to always be equal or above low_threshold
        if (top_threshold < low_threshold) {
            top_threshold = low_threshold
        }
    }
})
input.onButtonPressed(Button.AB, function () {
    if (mode != 0) {
        mode = 0
    }
})
input.onButtonPressed(Button.B, function () {
    // When the B button is pressed, either select the upper threshold menu mode
    // or increase the threshold of the mode that is currently selected
    if (mode == 0) {
        // If mode is "running/display", switch to top_threshold editing and display an indicator
        basic.showLeds(`
            # # # # #
            . . . . .
            . . # . .
            . # # # .
            # # # # #
            `)
        mode = 2
        basic.pause(1000)
    } else if (mode == 1) {
        // If lower-edit mode, increase lower threshold
        low_threshold = low_threshold + 5
        // Limit low_threshold to always be equal or below top_threshold
        if (low_threshold > top_threshold) {
            low_threshold = top_threshold
        }
    } else if (mode == 2) {
        // If upper-edit mode, increase upper threshold
        top_threshold = top_threshold + 5
        // Limit top_threshold to always be below the sensor_max
        if (top_threshold > sensor_max) {
            top_threshold = sensor_max
        }
    }
})
let mgraph_val = 0
let mgraph_range = 0
let moisturelvl = 0
let mode = 0
let sensor_max = 0
let low_threshold = 0
let top_threshold = 0
// Default top_threshold
top_threshold = 600
// Default low_threshold
low_threshold = 500
// sensor_max is the value from the hardwaree device spec sheet
sensor_max = 950
// delay_ms is the time to delay between updates in miliseconds
let delay_ms = 1000
basic.forever(function () {
    // Read the moisture sensor
    moisturelvl = pins.analogReadPin(AnalogPin.P0)
    // Calculate the range (in case it has changed)
    mgraph_range = top_threshold - low_threshold
    mgraph_val = moisturelvl - low_threshold
    if (mode == 0) {
        // In running mode, check if the moisture is in range and alert if it is not
        if (mgraph_val <= 0) {
            basic.showIcon(IconNames.Umbrella)
            soundExpression.twinkle.playUntilDone()
        }
    }
    // In other modes, display the current moisture in the context of the specified mgraph_range
    led.plotBarGraph(
    mgraph_val,
    mgraph_range
    )
    // Pause to leave the display on long enough to be seen
    basic.pause(delay_ms)
})
