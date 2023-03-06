# This script is evaluated each 5 minutes. 
# It updates the 'api.js' file

# Importing the libraries
from time import sleep
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
import pyperclip as pc

# This is the variable, where the script will put all downloaded data
programs = "["

# Starting the driver
options = webdriver.ChromeOptions() 
options.add_argument("start-maximized")
options.add_argument('disable-infobars')
browser = webdriver.Chrome(ChromeDriverManager().install(), chrome_options = options)

# Connecting to Khan Academy hotlist
browser.get('https://www.khanacademy.org/computing/computer-programming/browse')
sleep(5) # Waiting until the page loads

# Loading first 30 programs
i = 1
while i < 31:
    programs += "\n    {\n      title: '" + browser.find_element("xpath", '/html/body/div/div[3]/div/div[2]/div/div/main/div[2]/div[2]/div/div[1]/div/div[2]/div[' + str(i) + ']/div[1]/a[2]/span').text + "', \n      author: '" + browser.find_element("xpath", '/html/body/div/div[3]/div/div[2]/div/div/main/div[2]/div[2]/div/div[1]/div/div[2]/div[' + str(i) + ']/a/span').text + "', \n      votes: " + browser.find_element("xpath", '/html/body/div/div[3]/div/div[2]/div/div/main/div[2]/div[2]/div/div[1]/div/div[2]/div[' + str(i) + ']/div[2]').text.split(" ")[0] + ", \n      forks: " + browser.find_element("xpath", '/html/body/div/div[3]/div/div[2]/div/div/main/div[2]/div[2]/div/div[1]/div/div[2]/div[' + str(i) + ']/div[2]').text.split("· ")[1].split(" ")[0] + ", \n      thumbnail: '" + browser.find_element("xpath", '/html/body/div/div[3]/div/div[2]/div/div/main/div[2]/div[2]/div/div[1]/div/div[2]/div[' + str(i) + ']/div[1]/a[1]/img').get_attribute("src") + "', \n      link: '" + browser.find_element("xpath", '/html/body/div/div[3]/div/div[2]/div/div/main/div[2]/div[2]/div/div[1]/div/div[2]/div[' + str(i) + ']/div[1]/a[2]').get_attribute("href") + "'\n    }, "
    i += 1
programs += "\n  ];"
programs = "function HotlistAPI() {\n  return " + programs.encode("ascii", errors="ignore").decode() + "\n}"

# Writing the file
openedFile = open("api.js", "w");
openedFile.write(programs);
openedFile.close();

# That's all! Sucessfully updated. 
