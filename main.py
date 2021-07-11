# running_modes
# 0 = constant/curent display
# 1 = lower thresshold menu
# 2 = upper thresshold menu

def on_button_pressed_a():
    global running_mode, lower_threshold, upper_threshold
    # When the A button is pressed, either select the lowerthreshold menu running_mode
    # or decrease the threshold of the running_mode that is currently selected
    if running_mode == 0:
        # If running running_mode, switch to lower_threshold editing and display an indicator
        basic.show_leds("""
            # # # # #
                        . # # # .
                        . . # . .
                        . . . . .
                        # # # # #
        """)
        running_mode = 1
        basic.pause(1000)
    elif running_mode == 1:
        # If lower-edit running_mode, decrease lower threshold
        lower_threshold = lower_threshold - 5
    elif running_mode == 2:
        # If upper-edit running_mode, decrease upper threshold
        upper_threshold = upper_threshold - 5
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global running_mode
    if running_mode != 0:
        running_mode = 0
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global running_mode, lower_threshold, upper_threshold
    # When the B button is pressed, either select the upper threshold menu running_mode
    # or increase the threshold of the running_mode that is currently selected
    if running_mode == 0:
        # If running running_mode, switch to upper_threshold editing and display an indicator
        basic.show_leds("""
            # # # # #
                        . . . . .
                        . . # . .
                        . # # # .
                        # # # # #
        """)
        running_mode = 2
        basic.pause(1000)
    elif running_mode == 1:
        # If lower-edit running_mode, increase lower threshold
        lower_threshold = lower_threshold + 5
    elif running_mode == 2:
        # If upper-edit running_mode, increase upper threshold
        upper_threshold = upper_threshold + 5
input.on_button_pressed(Button.B, on_button_pressed_b)

moisture_graph_value = 0
moisture_graph_range = 0
moisturelvl = 0
running_mode = 0
lower_threshold = 0
upper_threshold = 0
upper_threshold = 600
lower_threshold = 500
moisture_max = 950
delay_ms = 1000

def on_forever():
    global moisturelvl, moisture_graph_range, moisture_graph_value
    # Read the moisture sensor
    moisturelvl = pins.analog_read_pin(AnalogPin.P0)
    # Calculate the range (in case it has changed)
    moisture_graph_range = upper_threshold - lower_threshold
    moisture_graph_value = moisturelvl - lower_threshold
    if running_mode == 0:
        # In running running_mode, check if the moisture is in range and alert if it is not
        if moisture_graph_value <= 0:
            basic.show_icon(IconNames.UMBRELLA)
            soundExpression.twinkle.play_until_done()
    # In other running_modes, display the current moisture in the context of the specified moisture_graph_range
    led.plot_bar_graph(moisture_graph_value, moisture_graph_range)
    # Pause to leave the display on long enough to be seen
    basic.pause(delay_ms)
basic.forever(on_forever)
