# esp8266

### reset causes

    reset causes:
        0: 
        1: normal boot
        2: reset pin
        3: software reset
        4: watchdog reset

    boot device:
        0:
        1: ram
        3: flash

### get flash_id using esptool.py

    esptool.py --port "$COMPORT" --baud 460800 flash_id

        Manufacturer: e0
        Device: 4016
        Detected flash size: 4MB

### known chip ids

      4 Mega Bits / 512K Byte      = ID 4013h
      8 Mega Bits /  1 Mega Byte   = ID 4014h
     16 Mega Bits /  2 Mega Bytes  = ID 4015h
     32 Mega Bits /  4 Mega Bytes  = ID 4016h
     64 Mega bits /  8 Mega Bytes  = ID 4017h
    128 Mega bits / 16 Mega Bytes  = ID 4018h

### get chip_id using esptool.py

    esptool.py --port "$COMPORT" --baud 460800 chip_id

        Chip ID: 0x00c1120b        last three octets of mac c1:11:02
                                   used for station and ap network interface
                                   

### pins to use for hardware SPI

    SPI CLK = GPIO14
    SPI MOSI = GPIO13
    SPI MISO = GPIO12
