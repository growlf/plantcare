# modes
# 0 = constant/curent display
# 1 = lower threshold menu
# 2 = upper threshold menu

def on_button_pressed_a():
    global mode, low_threshold, top_threshold
    # When the A button is pressed, either select the lowerthreshold menu mode
    # or decrease the threshold of the mode that is currently selected
    if mode == 0:
        # If mode is "running/display", switch to low_threshold editing and display an indicator
        basic.show_leds("""
            # # # # #
                        . # # # .
                        . . # . .
                        . . . . .
                        # # # # #
        """)
        mode = 1
        basic.pause(1000)
    elif mode == 1:
        # If lower-edit mode, decrease lower threshold
        low_threshold = low_threshold - 5
        # limit threshold to zero for sanity
        if low_threshold < 0:
            low_threshold = 0
    elif mode == 2:
        # If upper-edit mode, decrease upper threshold
        top_threshold = top_threshold - 5
        # Limit threshold to always be equal or above low_threshold
        if top_threshold < low_threshold:
            top_threshold = low_threshold
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global mode
    if mode != 0:
        mode = 0
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global mode, low_threshold, top_threshold
    # When the B button is pressed, either select the upper threshold menu mode
    # or increase the threshold of the mode that is currently selected
    if mode == 0:
        # If mode is "running/display", switch to top_threshold editing and display an indicator
        basic.show_leds("""
            # # # # #
                        . . . . .
                        . . # . .
                        . # # # .
                        # # # # #
        """)
        mode = 2
        basic.pause(1000)
    elif mode == 1:
        # If lower-edit mode, increase lower threshold
        low_threshold = low_threshold + 5
        # Limit low_threshold to always be equal or below top_threshold
        if low_threshold > top_threshold:
            low_threshold = top_threshold
    elif mode == 2:
        # If upper-edit mode, increase upper threshold
        top_threshold = top_threshold + 5
        # Limit top_threshold to always be below the sensor_max
        if top_threshold > sensor_max:
            top_threshold = sensor_max
input.on_button_pressed(Button.B, on_button_pressed_b)

mgraph_val = 0
mgraph_range = 0
moisturelvl = 0
mode = 0
sensor_max = 0
low_threshold = 0
top_threshold = 0
# Default top_threshold
top_threshold = 600
# Default low_threshold
low_threshold = 500
# sensor_max is the value from the hardwaree device spec sheet
sensor_max = 950
# delay_ms is the time to delay between updates in miliseconds
delay_ms = 1000

def on_forever():
    global moisturelvl, mgraph_range, mgraph_val, top_threshold, low_threshold, delay_ms
    # Read the moisture sensor
    moisturelvl = pins.analog_read_pin(AnalogPin.P0)
    # Calculate the range (in case it has changed)
    mgraph_range = top_threshold - low_threshold
    mgraph_val = moisturelvl - low_threshold
    if mode == 0:
        # In running mode, check if the moisture is in range and alert if it is not
        if mgraph_val <= 0:
            basic.show_icon(IconNames.UMBRELLA)
            soundExpression.twinkle.play_until_done()
    # In other modes, display the current moisture in the context of the specified mgraph_range
    led.plot_bar_graph(mgraph_val, mgraph_range)
    # Pause to leave the display on long enough to be seen
    basic.pause(delay_ms)
basic.forever(on_forever)
