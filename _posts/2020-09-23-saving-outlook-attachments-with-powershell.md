---
ref: outlook_saveattachments
title: Saving Outlook attachments with PowerShell
excerpt:
permalink: /blog/:year/:month/:title 
tags: [english, tools, outlook, powershell]
categories: [english, powershell]
lang: en
locale: en-GB
toc: true
---

![](/assets/images/ps-outlook-attachments-01.png)

## Problem

Save attachments from hundreds of emails received via Microsoft Outlook using PowerShell.

### Scenario

One of the systems generates report daily and sends it out via email as an attachment, that is being saved in the Inbox subfolder MyAlerts. Sample email below. After 6 months someone decides to analyze all the reports from the attachments.

|               |                           |
|---            |---                        |
| Subject       | Mikey – this is important |
| Body          | Daily report attached     |
| Attachment    | VeryImportantReport.txt   |
|               |                           |


### Challenges
* all emails have the same subject
* all attachments have the same name
* one email daily over 6 months makes ~180 emails

## Solution

Below is my proposed solution in PowerShell. Run through all the emails in the MyAlert folder and save attachments as files with an added timestamp (taken from the email received time.

At the bottom you will find the whole script.

### Microsoft Outlook Inbox
In order to access the inbox, we would need to use GetNameSpace method that supports ‘MAPI’ names space type. inbox no 6. Read about other folders at [Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/api/microsoft.office.interop.outlook.oldefaultfolders?view=outlook-pia).

```powershell
# use MAPI name space
$outlook = new-object -com outlook.application; 
$mapi = $outlook.GetNameSpace("MAPI");
```

Next, we are going to use GetDefaultFolder method to obtain the default Inbox folder for the user. The default Inbox folder has id = 6 according to [Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/api/microsoft.office.interop.outlook.oldefaultfolders?view=outlook-pia) (check out other folders, like Calendar, Contacts, Outbox).

```powershell
# we need Inbox folder
$olDefaultFolderInbox = 6
$inbox = $mapi.GetDefaultFolder($olDefaultFolderInbox) 
```

We can see all the folders under Inbox too:

```powershell
# see folders under Inbox
$inbox.Folders | SELECT FolderPath
<#
\\Michal.Bronowski@outlook.com\Inbox\MyAlerts
\\Michal.Bronowski@outlook.com\Inbox\MyCoal
\\Michal.Bronowski@outlook.com\Inbox\MyKey
#>
```

In our scenario, the emails with reports land in a subfolder of the Inbox (MyAlerts).

![Custom subfolder under Inbox](/assets/images/ps-outlook-attachments-01.png)

Now, we are going to get access to the subfolder:

```powershell
# link to the folder 
$olFolderPath = "\\Michal.Bronowski@outlook.com\Inbox\MyAlerts"
# access the target subfolder
$targetFolder = $inbox.Folders | Where-Object { $_.FolderPath -eq $olFolderPath }
```

### Emails & Attachments

Once we get there we can retrieve our emails, in this case, called **Items**. As expected we have 180 emails in that folder

```powershell
# load emails
$emails = $targetFolder.Items
# get email count
$emails.Count
<#
180
#>
```

The single email has a lot of properties, but we are mostly interested in **ReceivedTime** and **Attachments** (to rename attachments as these have the same name).

```powershell
# single email timestamp
$emails[1].ReceivedTime
<#
20 September 2020 20:00:25
#>
# make the timestamp a bit cleaner
$email.ReceivedTime.ToString("yyyyMMddhhmmss")
<#
20200603080025
#>
```
Now let’s have a look at the attachments.

```powershell
# single email attachment details
$emails[1].Attachments
<#
Application      : Microsoft.Office.Interop.Outlook.ApplicationClass
Class            : 5
Session          : Microsoft.Office.Interop.Outlook.NameSpaceClass
Parent           : System.__ComObject
DisplayName      : VeryImportantReport.txt
FileName         : VeryImportantReport.txt
Index            : 1
MAPIOBJECT       : System.__ComObject
PathName         : 
Position         : 0
Type             : 1
PropertyAccessor : System.__ComObject
Size             : 2784
BlockLevel       : 0
#>
# single attachment file name
$emails[1].Attachments[1].FileName
<#
VeryImportantReport.txt
#>
```

We will use this name to filter out the attachments from the emails.

```powershell
# set the desired file name
$attachmentFileName = 'VeryImportantReport.txt'
# filter out the attachments based on the variable
$email.Attachments | Where-Object {$_.FileName -eq $attachmentFileName}
```

### Save it

Remember that timestamp we had? Now, we are going to add it to the filename so we do not end up with… a single output file.

```powershell
# get the file name from the attachment
$fileName = $_.FileName
# inject the timestamp before the file extension
$fileName = $fileName.Insert($fileName.IndexOf('.'),$timestamp)
```

Finally, save the attachments to the folder. We are going to use the temporary folder, so it does not leave too much mess behind.

```powershell
# set the location to temporary file
$filePath = "$ENV:Temp"
<#
C:\Users\Mikey\AppData\Local\Temp
$>
# save the file
$_.saveasfile((Join-Path $filePath $fileName)) 
```

### Complete solution

Below is the complete solution that allows saving the attachments from a specified folder.

```powershell
# link to the folder 
$olFolderPath = "\\Michal.Bronowski@outlook.com\Inbox\MyAlerts"
# set the desired file name
$attachmentFileName = 'VeryImportantReport.txt'
# set the location to temporary file
$filePath = "$ENV:Temp"
# use MAPI name space
$outlook = new-object -com outlook.application; 
$mapi = $outlook.GetNameSpace("MAPI");
# set the Inbox folder id
$olDefaultFolderInbox = 6
$inbox = $mapi.GetDefaultFolder($olDefaultFolderInbox) 
# access the target subfolder
$olTargetFolder = $inbox.Folders | Where-Object { $_.FolderPath -eq $olFolderPath }
# load emails
$emails = $olTargetFolder.Items
# process the emails
foreach ($email in $emails) {
    
    # format the timestamp
    $timestamp = $email.ReceivedTime.ToString("yyyyMMddhhmmss")
    # filter out the attachments
    $email.Attachments | Where-Object {$_.FileName -eq $attachmentFileName} | foreach {
        
        # insert the timestamp into the file name
        $fileName = $_.FileName
        $fileName = $fileName.Insert($fileName.IndexOf('.'),$timestamp)
        # save the attachment
        $_.saveasfile((Join-Path $filePath $fileName)) 
    } 
} 
```
Thank you,

Mikey
