---
ref: tsql2sday133
title: T-SQL Tuesday 133 - What (Else) Have You Learned from Presenting?
excerpt: "This month the #TSQL2SDAY invitation comes from Lisa Bohm who asks us about technical things we have learned from writing or giving the presentation."
tags: [english, community, events, sqlfamily, tsql2sday]
categories: [english, community, events, tsql2sday]
lang: en
locale: en-GB
toc: true
permalink: /blog/:year/:month/:title/
---

[![T-SQL Tuesday Logo](/assets/images/t-sql-tuesday-logo.jpg)](https://lisagb.info/archives/77 "T-SQL Tuesday invitation")

Last month of the year brings a great topic proposed by Lisa Bohm ([blog](https://https//lisagb.info/)\|[twitter](https://twitter.com/LisaGB_sql)). Lisa asks about technical things we have learned from writing or giving the presentation.

While ago I have written a post about [saving Outlook attachments with PowerShell](https://www.bronowski.it/blog/2020/09/saving-outlook-attachments-with-powershell/) and that that was actually the thing I learned from the topic I want to describe today.

I could not use PowerShell at that moment (security, security), so had to figure it out in the most common scripting language in office – VBA.

First, start with…

## How to run VBA in Outlook?

Good question and the answer is not that obvious if one is not familiar with VBA.

### Add the Developer tab to Outlook

In order to do that go to the **Files** menu and select the **Options** tab. On the left pane somewhere at the bottom, there is a tab Customize Ribbon. Click on that and go to the right side wherefrom the drop-down list you can select **All Tabs** and below that more times will show up. One of the items is **Developer**, check the checkbox and…

![Add Developer to the Outlook ribbon](/assets/images/tsql2sday133_01.png)
…voila! The **Developer** tab is on your ribbon.

![Open Visual Basic editor in Outlook](/assets/images/tsql2sday133_02.png)

### Go to the Visual Basic editor

On the **Developer** tab go to the Code section and pick the Visual Basic button. Read the security prompt and pick one of the options that are the best for you (only one will let you run macros though).

![Enable Macros in Outlook](/assets/images/tsql2sday133_03.png)

Once you get pass that there is a blank screen inviting us to write a beautiful VBA code:

![Write VBA macros in Outlook](/assets/images/tsql2sday133_04.png)

Write it, save it, run it 🙂 Enjoy!

Now to the problem.

![The problem – saving attachments](/assets/images/tsql2sday133_05.png)

## The problem – saving attachments

As in the previous post, I had the same goal – save attachments from multiple emails. The example email looks like below. It has the same subject, arrives at the same time every day and has one attachment…

![My mailbox every morning](/assets/images/tsql2sday133_06.png)

…which name is the same every day too.

![Email with the attachment](/assets/images/tsql2sday133_07.png)

I would like to :
– go to my mailbox,
– select all the email from past few days/weeks/months
– and snap my fingers to get the attachments in one place
– also not overwriting them since all have the same name
– would be nice if I keep the timestamp, so I know which report is wich.

## The solution – VBA script to save multiple attachments from multiple emails

When I was looking for the solution there were plenty of examples how to do it, so it is not a revolutionary script, but I have added few bits here and there to make it work in my environment. The code with the comments at the bottom of this post.

Once you copy the file to the Visual Basic editor, save it and go back to the Outlook mailbox. Select the emails, go back to the editor and hit **F5**.

There is another way to run the script. Again, select all the emails with attachments, on the **Developer** tab go to **Code** and from the **Macro** drop-down list pick the macro that has been just added.

![Run VBA macro in Outlook](/assets/images/tsql2sday133_08.png)

In my case the attachments are being save to the **Attachment** folder and look like that

![Email attachments saved with VBA](/assets/images/tsql2sday133_09.png)

You can spot there are two reports for 20201205 and that's because I have modified one of the received emails by adding the same attachment (it had the same name), so the script handles that as well by adding an "id" of an attachment to the name.

VBA script to save Outlook attachments
Here is the full script I have used:

```vba
Public Sub SaveAttachments()
    Dim OL As Outlook.Application
    Dim email As Outlook.MailItem
    Dim emailAttachments As Outlook.Attachments
    Dim OLSelect As Outlook.Selection
    Dim i As Long
    Dim attachmentCnt As Long
    Dim saveFile As String
    Dim savePath As String
    
    ' define path where to save files
    savePath = CreateObject("WScript.Shell").SpecialFolders(16)
    savePath = savePath & "\Attachments\"
    Set OL = CreateObject("Outlook.Application")
    Set OLSelect = OL.ActiveExplorer.Selection
    
    ' start processing emails in the selection
    ' and then each attachment per email
    For Each email In OLSelect
        Set emailAttachments = email.Attachments
        
        ' get the number of attachments in each email
        attachmentCnt = emailAttachments.Count

        ' skip the emails without attachments
        If attachmentCnt > 0 Then
            ' start processing attachments within email
            For i = attachmentCnt To 1 Step -1
                'get the recived time from the email and add it in fron of the filename
                saveFile = Format(email.ReceivedTime, "yyyyMMdd_hhmmss") & "_" & i & "_" & emailAttachments.Item(i).FileName
                
                ' get the final path for the attachment including folder and file name
                saveFile = savePath & saveFile
                
                ' save attachment within a loop
                emailAttachments.Item(i).SaveAsFile saveFile
                
                ' save an attachment
                email.Save
                
                ' next attachment to check
                Next i
            End If
            ' stop processing attachments within email
        Next
    ' stop processing emails in the selection
ExitSub:
        ' cleaning up after myself
        ' https://docs.microsoft.com/en-us/office/vba/language/reference/user-interface-help/nothing-keyword
        Set objAttachments = Nothing
        Set email = Nothing
        Set objSelection = Nothing
        Set OL = Nothing
End Sub
```

## Bonus: How to edit received emails in Outlook?

Open an email and on the **Message** tab go to the **Move** section and from drop-down **Actions** click on **Edit Message**

![Edit received emails](/assets/images/tsql2sday133_10.png)

Thanks,

Mikey