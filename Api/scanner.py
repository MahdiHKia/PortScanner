import pyfiglet
import sys
import socket
from datetime import datetime
from concurrent.futures.thread import ThreadPoolExecutor

executor = ThreadPoolExecutor(max_workers=1000)
ascii_banner = pyfiglet.figlet_format("PORT SCANNER")
# print(ascii_banner)

# Defining a target
target = '1.1.1.1'
# Add Banner
# print("-" * 50)
# print("Scanning Target: " + target)
# print("Scanning started at:" + str(datetime.now()))
# print("-" * 50)


def scanner(port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    socket.setdefaulttimeout(1)

    # returns an error indicator
    result = s.connect_ex((target, port))
    if result == 0:
        s.close()
        return True, port
    s.close()
    return False, port


import time

# try:
#     now = time.time()
#     x = executor.map(scanner, [18, 666, 22, 21, 80, 443])
#     for xx in x:
#         print(xx)
#     print(time.time() - now)
# except KeyboardInterrupt:
#     print("\n Exitting Program !!!!")
#     sys.exit()
# except socket.gaierror:
#     print("\n Hostname Could Not Be Resolved !!!!")
#     sys.exit()
# except socket.error:
#     print("\ Server not responding !!!!")
#     sys.exit()

# from icmplib import ping
#
# r = ping('192.168.1.2', count=1)
#
# print(r.is_alive)
# def start_scan()

# data = {}
#
# for i in range(0, 65535):
#     # print(i)
#     try:
#         data[i] = socket.getservbyport(i)
#     except:
#         pass
# print(data)

