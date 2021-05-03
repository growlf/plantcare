# mode
# 0 = running mode
# 1 = lower thresshold setting
# 2 = upper thresshold setting

def on_button_pressed_a():
    global mode, threshold_lower, threshold_upper
    if mode == 0:
        basic.show_leds("""
            # # # # #
            . # # # .
            . . # . .
            . . . . .
            # # # # #
            """)
        mode = 1
    elif mode == 1:
        # If running, switch to lower threshold editing
        # If lower-edit mode, decrease threshold
        threshold_lower = threshold_lower - 5
        led.plot_bar_graph(threshold_lower, 700)
    elif mode == 2:
        # If upper-edit mode, decrease threshold
        threshold_upper = threshold_upper - 5
        led.plot_bar_graph(threshold_upper, 700)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global mode
    if mode != 0:
        mode = 0
    led.plot_bar_graph(moisturelvl, 700)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global mode, threshold_lower, threshold_upper
    if mode == 0:
        basic.show_leds("""
            # # # # #
            . . . . .
            . . # . .
            . # # # .
            # # # # #
            """)
        mode = 1
    elif mode == 1:
        # If running, switch to lower threshold editing
        # If lower-edit mode, increase threshold
        threshold_lower = threshold_lower + 5
        led.plot_bar_graph(threshold_lower, 700)
    elif mode == 2:
        # If upper-edit mode, increase threshold
        threshold_upper = threshold_upper + 5
        led.plot_bar_graph(threshold_upper, 700)
input.on_button_pressed(Button.B, on_button_pressed_b)

moisturelvl = 0
mode = 0
threshold_lower = 0
threshold_upper = 0
threshold_upper = 400
threshold_lower = 200

def on_forever():
    global moisturelvl
    moisturelvl = pins.analog_read_pin(AnalogPin.P0)
    if mode == 0:
        if moisturelvl <= threshold_lower:
            basic.show_icon(IconNames.UMBRELLA)
        else:
            led.plot_bar_graph(moisturelvl, 700)
    basic.pause(1000)
basic.forever(on_forever)
