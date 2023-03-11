# This script is used in NEW version
# It removes old API logs

import datetime

for i in range(3, 600, 1):
    fullOldDate = (datetime.datetime.utcnow() - datetime.timedelta(minutes = i)).strftime('%Y%m%d%H%M')
    fullOldDateSplited = list(fullOldDate)
    for j in range(0, 10):
      oldFileName = "new-api/new-api-" + fullOldDateSplited[0] + fullOldDateSplited[1] + fullOldDateSplited[2] + fullOldDateSplited[3] + fullOldDateSplited[4] + fullOldDateSplited[5] + fullOldDateSplited[6] + fullOldDateSplited[7] + fullOldDateSplited[8] + fullOldDateSplited[9] + fullOldDateSplited[10] + fullOldDateSplited[11] + "-" + str(j) + ".js"
      try:
          os.remove(oldFileName)
      except:
          pass
