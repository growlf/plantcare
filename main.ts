//  running_modes
//  0 = constant/curent display
//  1 = lower thresshold menu
//  2 = upper thresshold menu
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    //  When the A button is pressed, either select the lowerthreshold menu running_mode
    //  or decrease the threshold of the running_mode that is currently selected
    if (running_mode == 0) {
        //  If running running_mode, switch to lower_threshold editing and display an indicator
        basic.showLeds(`
            # # # # #
                        . # # # .
                        . . # . .
                        . . . . .
                        # # # # #
        `)
        running_mode = 1
        basic.pause(1000)
    } else if (running_mode == 1) {
        //  If lower-edit running_mode, decrease lower threshold
        lower_threshold = lower_threshold - 5
    } else if (running_mode == 2) {
        //  If upper-edit running_mode, decrease upper threshold
        upper_threshold = upper_threshold - 5
    }
    
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    
    if (running_mode != 0) {
        running_mode = 0
    }
    
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    //  When the B button is pressed, either select the upper threshold menu running_mode
    //  or increase the threshold of the running_mode that is currently selected
    if (running_mode == 0) {
        //  If running running_mode, switch to upper_threshold editing and display an indicator
        basic.showLeds(`
            # # # # #
                        . . . . .
                        . . # . .
                        . # # # .
                        # # # # #
        `)
        running_mode = 2
        basic.pause(1000)
    } else if (running_mode == 1) {
        //  If lower-edit running_mode, increase lower threshold
        lower_threshold = lower_threshold + 5
    } else if (running_mode == 2) {
        //  If upper-edit running_mode, increase upper threshold
        upper_threshold = upper_threshold + 5
    }
    
})
let moisture_graph_value = 0
let moisture_graph_range = 0
let moisturelvl = 0
let running_mode = 0
let lower_threshold = 0
let upper_threshold = 0
upper_threshold = 600
lower_threshold = 500
let moisture_max = 950
let delay_ms = 1000
basic.forever(function on_forever() {
    
    //  Read the moisture sensor
    moisturelvl = pins.analogReadPin(AnalogPin.P0)
    //  Calculate the range (in case it has changed)
    moisture_graph_range = upper_threshold - lower_threshold
    moisture_graph_value = moisturelvl - lower_threshold
    if (running_mode == 0) {
        //  In running running_mode, check if the moisture is in range and alert if it is not
        if (moisture_graph_value <= 0) {
            basic.showIcon(IconNames.Umbrella)
            soundExpression.twinkle.playUntilDone()
        }
        
    }
    
    //  In other running_modes, display the current moisture in the context of the specified moisture_graph_range
    led.plotBarGraph(moisture_graph_value, moisture_graph_range)
    //  Pause to leave the display on long enough to be seen
    basic.pause(delay_ms)
})
