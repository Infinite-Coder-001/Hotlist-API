# Version 1.3.0
# This script is evaluated every 5-10 minutes. 
# It updates the 'api.js' file. 

# Importing the libraries
import os
import datetime
from time import sleep
from random import randint
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
#from urllib.parse import quote

# This is the variable, where the script will put all downloaded data
programs = "["

# Starting the driver
options = webdriver.ChromeOptions() 
options.add_argument("start-maximized")
options.add_argument('disable-infobars')
options.add_argument("--headless")
browser = webdriver.Chrome("chromedriver", chrome_options = options)

# Connecting to Khan Academy hotlist
browser.get('https://www.khanacademy.org/computing/computer-programming/browse')
sleep(5) # Waiting until the page loads

# Loading first 30 programs
i = 1
while i < 31:
    programs += "\n    {\n      title: '" + browser.find_element("xpath", '/html/body/div/div[3]/div/div[2]/div/div/main/div[2]/div[2]/div/div[1]/div/div[2]/div[' + str(i) + ']/div[1]/a[2]/span').text.replace("\\", "\\\\").replace("'", "\\'").replace("<", "&#60;") + "', \n      author: '" + browser.find_element("xpath", '/html/body/div/div[3]/div/div[2]/div/div/main/div[2]/div[2]/div/div[1]/div/div[2]/div[' + str(i) + ']/a/span').text.replace("\\", "\\\\").replace("'", "\\'").replace("<", "&#60;") + "', \n      votes: " + browser.find_element("xpath", '/html/body/div/div[3]/div/div[2]/div/div/main/div[2]/div[2]/div/div[1]/div/div[2]/div[' + str(i) + ']/div[2]').text.split(" ")[0] + ", \n      forks: " + browser.find_element("xpath", '/html/body/div/div[3]/div/div[2]/div/div/main/div[2]/div[2]/div/div[1]/div/div[2]/div[' + str(i) + ']/div[2]').text.split("· ")[1].split(" ")[0] + ", \n      thumbnail: '" + browser.find_element("xpath", '/html/body/div/div[3]/div/div[2]/div/div/main/div[2]/div[2]/div/div[1]/div/div[2]/div[' + str(i) + ']/div[1]/a[1]/img').get_attribute("src") + "', \n      link: '" + browser.find_element("xpath", '/html/body/div/div[3]/div/div[2]/div/div/main/div[2]/div[2]/div/div[1]/div/div[2]/div[' + str(i) + ']/div[1]/a[2]').get_attribute("href") + "', \n      authorLink: '" + browser.find_element("xpath", '/html/body/div/div[3]/div/div[2]/div/div/main/div[2]/div[2]/div/div[1]/div/div[2]/div[' + str(i) + ']/a').get_attribute("href") + "'\n    }, "
    i += 1
programs += "\n  ];"
programs = "var LoadHotlistAPI = function() {\n  return " + programs + "\n};"
# programs = "var LoadHotlistAPI = function() {\n  return " + programs.encode("ascii", errors="ignore").decode() + "\n};"

# Removing files older, than 3 hours
for i in range(0, 600, 10):
    fullOldDate = (datetime.datetime.utcnow() - datetime.timedelta(minutes = 10 + i)).strftime('%Y%m%d%H%M')
    fullOldDateSplited = list(fullOldDate)
    oldFileName = "api-" + fullOldDateSplited[0] + fullOldDateSplited[1] + fullOldDateSplited[2] + fullOldDateSplited[3] + fullOldDateSplited[4] + fullOldDateSplited[5] + fullOldDateSplited[6] + fullOldDateSplited[7] + fullOldDateSplited[8] + fullOldDateSplited[9] + fullOldDateSplited[10] + "0.js"
    try:
        os.remove(oldFileName)
    except:
        pass

# Creating new file
fullNewDate = datetime.datetime.utcnow().strftime('%Y%m%d%H%M')
fullNewDateSplited = list(fullNewDate)
newFileName = "api-" + fullNewDateSplited[0] + fullNewDateSplited[1] + fullNewDateSplited[2] + fullNewDateSplited[3] + fullNewDateSplited[4] + fullNewDateSplited[5] + fullNewDateSplited[6] + fullNewDateSplited[7] + fullNewDateSplited[8] + fullNewDateSplited[9] + fullNewDateSplited[10] + "0.js"

openedFile = open(newFileName, "w");
openedFile.write(programs);
openedFile.close();

# That's all! Sucessfully updated. 
