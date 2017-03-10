## Espressif - Restore 

-- boot part 
esptool.py --port /dev/cu.usbserial --baud 460800 write_flash 0x00000 espressif/ESP_8266_BIN0.92.bin

-- all parts 
esptool.py --port /dev/cu.usbserial write_flash 0x00000 restore/boot_v1.1.bin 0x01000 restore/user1.bin 0x7C000 restore/esp_init_data_default.bin 0x7E000 restore/blank.bin

-- blank all
-- perl -e 'print chr(0xff) x 1024 x 512' > restore/blank_512k.bin
-- esptool.py --port /dev/cu.usbserial write_flash 0x00000 blank_512k.bin
esptool.py --port /dev/cu.usbserial --baud 460800 erase_flash