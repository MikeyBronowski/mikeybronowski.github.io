---
ref: dbatools_ssmscmd_cert
title: "dbatools.io = command-line SQL Server Management Studio - Keys, certificates"
excerpt:
permalink: /blog/:year/:month/:title/
tags: [english, dbatools, community, tools, sqlfamily]
categories: [english, dbatools, series]
lang: en
locale: en-GB
toc: true
---
![dbatools.io = command-line SQL Server Management Studio](/assets/images/dbatools_ssmscmd.png)

This post is part of the series showing practical usage examples. The main post covering links to all posts can be found here: [dbatools.io = command-line SQL Server Management Studio: Table of contents](https://www.bronowski.it/blog/2020/06/dbatools-io-command-line-sql-server-management-studio-table-of-contents/).

dbatools commands used in this post:

* [New-DbaServiceMasterKey](#New-DbaServiceMasterKey)
* [Backup-DbaServiceMasterKey](https://www.bronowski.it/blog/2020/09/dbatools-io--command-line-sql-server-management-studio-keys-certificates/#New-DbaServiceMasterKey)
* [New-DbaDbMasterKey](https://www.bronowski.it/blog/2020/09/dbatools-io--command-line-sql-server-management-studio-keys-certificates/#New-DbaDbMasterKey)
* [Get-DbaDbMasterKey](https://www.bronowski.it/blog/2020/09/dbatools-io--command-line-sql-server-management-studio-keys-certificates/#New-DbaDbMasterKey)
* [Backup-DbaDbMasterKey](https://www.bronowski.it/blog/2020/09/dbatools-io--command-line-sql-server-management-studio-keys-certificates/#New-DbaDbMasterKey)
* [Remove-DbaDbMasterKey](https://www.bronowski.it/blog/2020/09/dbatools-io--command-line-sql-server-management-studio-keys-certificates/#New-DbaDbAsymmetricKey)
* [New-DbaDbAsymmetricKey](https://www.bronowski.it/blog/2020/09/dbatools-io--command-line-sql-server-management-studio-keys-certificates/#New-DbaDbAsymmetricKey)
* [Get-DbaDbAsymmetricKey](https://www.bronowski.it/blog/2020/09/dbatools-io--command-line-sql-server-management-studio-keys-certificates/#New-DbaDbAsymmetricKey)
* [Remove-DbaDbAsymmetricKey](https://www.bronowski.it/blog/2020/09/dbatools-io--command-line-sql-server-management-studio-keys-certificates/#New-DbaDbAsymmetricKey)
* [New-DbaDbCertificate](https://www.bronowski.it/blog/2020/09/dbatools-io--command-line-sql-server-management-studio-keys-certificates/#New-DbaDbCertificate)
* [Get-DbaDbCertificate](https://www.bronowski.it/blog/2020/09/dbatools-io--command-line-sql-server-management-studio-keys-certificates/#New-DbaDbCertificate)
* [Backup-DbaDbCertificate](https://www.bronowski.it/blog/2020/09/dbatools-io--command-line-sql-server-management-studio-keys-certificates/#New-DbaDbCertificate)
* [Remove-DbaDbCertificate](https://www.bronowski.it/blog/2020/09/dbatools-io--command-line-sql-server-management-studio-keys-certificates/#New-DbaDbCertificate)
* [Restore-DbaDbCertificate](https://www.bronowski.it/blog/2020/09/dbatools-io--command-line-sql-server-management-studio-keys-certificates/#New-DbaDbCertificate)


## Service Master Key

There are multiple security-related objects that are not easily accessible via SQL Server Management Studio. The first one would be Service Master Key, if exists, can be seen under the master database. Luckily, dbatools can help us to take a backup.

![New-DbaServiceMasterKey](/assets/images/dbatools_ssmscmd_1201_masterkey.png)

### [New-DbaServiceMasterKey](http://docs.dbatools.io/#New-DbaServiceMasterKey)

```powershell
# set the secure password that will be used later on
$securePassword = ('&lt;YourStrong@Passw0rd>' | ConvertTo-SecureString -asPlainText -Force)

# creating Service Master Key if does not exist
New-DbaServiceMasterKey -SqlInstance $server -SecurePassword $securePassword -WhatIf

<#
What if: Performing the operation "Creating New MasterKey" on target "localhost,1433".
#>
```

### [Backup-DbaServiceMasterKey](http://docs.dbatools.io/#Backup-DbaServiceMasterKey)

```powershell
# backup the Service Master Key
Backup-DbaServiceMasterKey -SqlInstance $server -SecurePassword $securePassword

<#
ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : e6928404da5d
Path         : /var/opt/mssql/data\localhost,1433-SMK-20200915225130.key
Status       : Success
#>
```

## Database Master Key

There is no way to see database master keys via SSMS GUI, so the only way would be to manage it using T-SQL, or... dbatools.

### [New-DbaDbMasterKey](https://docs.dbatools.io/#New-DbaDbMasterKey)

```powershell
# new Database Master Key for multiple databases
New-DbaDbMasterKey -SqlInstance $server -Database keys, model -SecurePassword $securePassword -Confirm:$false

<#
ComputerName        : localhost
InstanceName        : MSSQLSERVER
SqlInstance         : e6928404da5d
Database            : keys
CreateDate          : 15/09/2020 21:58:00
DateLastModified    : 15/09/2020 21:58:00
IsEncryptedByServer : True

ComputerName        : localhost
InstanceName        : MSSQLSERVER
SqlInstance         : e6928404da5d
Database            : model
CreateDate          : 15/09/2020 21:58:56
DateLastModified    : 15/09/2020 21:58:56
IsEncryptedByServer : True
#>
```

### [Get-DbaDbMasterKey](https://docs.dbatools.io/#Get-DbaDbMasterKey)


```powershell
# list all Database Master Keys available on the instance
Get-DbaDbMasterKey -SqlInstance $server | Format-Table

<#
ComputerName InstanceName SqlInstance  Database CreateDate          DateLastModified    IsEncryptedByServer
------------ ------------ -----------  -------- ----------          ----------------    -------------------
localhost    MSSQLSERVER  e6928404da5d keys    15/09/2020 21:58:56 15/09/2020 21:58:56                True
localhost    MSSQLSERVER  e6928404da5d model     15/09/2020 21:58:00 15/09/2020 21:58:00                True
#>
```

### [Backup-DbaDbMasterKey](https://docs.dbatools.io/#Backup-DbaDbMasterKey)

```powershell
# backup all Database Master Keys
Backup-DbaDbMasterKey -SqlInstance $server -SecurePassword $securePassword

<#
ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : e6928404da5d
Database     : keys
Path         : /var/opt/mssql/data\localhost,1433-keys-20200915230106.key
Status       : Success

ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : e6928404da5d
Database     : model
Path         : /var/opt/mssql/data\localhost,1433-model-20200915230106.key
Status       : Success
#>
```

### [Remove-DbaDbMasterKey](https://docs.dbatools.io/#Remove-DbaDbMasterKey)

```powershell
# remove all the Database Master Keys
Remove-DbaDbMasterKey -SqlInstance $server -All -Confirm:$false

<#
ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : e6928404da5d
Database     : keys
Status       : Master key removed

ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : e6928404da5d
Database     : model
Status       : Master key removed
#>
```

## Database Asymmetric Key

A very similar case to the service master key - we can see them in the object explorer, but not much can be done via GUI. dbatools to the rescue.

![New-DbaDbAsymmetricKey](/assets/images/dbatools_ssmscmd_1202_asymmetrickey.png)

### [New-DbaDbAsymmetricKey](https://docs.dbatools.io/#New-DbaDbAsymmetricKey)

```powershell
New-DbaDbAsymmetricKey -SqlInstance $server -Name AsymmKey1 -Database keys -SecurePassword $securePassword -Algorithm Rsa4096

<#
ComputerName                 : localhost
InstanceName                 : MSSQLSERVER
SqlInstance                  : e6928404da5d
Database                     : keys
Name                         : AsymmKey1
Subject                      : 
StartDate                    : 
ActiveForServiceBrokerDialog : 
ExpirationDate               : 
Issuer                       : 
LastBackupDate               : 
Owner                        : dbo
PrivateKeyEncryptionType     : Password
Serial                       : 
#>
```

### [Get-DbaDbAsymmetricKey](https://docs.dbatools.io/#Get-DbaDbAsymmetricKey)

```powershell
# see the list of the asymmetric keys
Get-DbaDbAsymmetricKey -SqlInstance $server | Format-Table

<#
ComputerName InstanceName SqlInstance  Database Name      Owner       KeyEncryptionAlgorithm KeyLength PrivateKeyEncryptionType Thumbprint            
------------ ------------ -----------  -------- ----      -----       ---------------------- --------- ------------------------ ----------            
localhost    MSSQLSERVER  e6928404da5d keys     AsymmKey1 dbo   CryptographicProviderDefined      4096                 Password {47, 222, 249, 180...} 
#>
```

### [Remove-DbaDbAsymmetricKey](https://docs.dbatools.io/#Remove-DbaDbAsymmetricKey)

```powershell
# remove a selected asymmetric key
Remove-DbaDbAsymmetricKey -SqlInstance $server -Database keys -Confirm:$false

<#
ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : e6928404da5d
Database     : keys
Name         : AsymmKey1
Status       : Success
#>
```

## Database Certificate

Another object from the "family" where we can see it in the Object Explorer, but the only available option is "Delete".

![New-DbaDbCertificate](/assets/images/dbatools_ssmscmd_1203_dbcert.png)

### [New-DbaDbCertificate](https://docs.dbatools.io/#New-DbaDbCertificate)

```powershell
# get a new database certificate
New-DbaDbCertificate -SqlInstance $server -Database keys -Name CertKey -SecurePassword $securePassword

<#
ComputerName                 : localhost
InstanceName                 : MSSQLSERVER
SqlInstance                  : e6928404da5d
Database                     : keys
Name                         : CertKey
Subject                      : CertKey Database Certificate
StartDate                    : 15/09/2020 00:00:00
ActiveForServiceBrokerDialog : False
ExpirationDate               : 15/09/2025 00:00:00
Issuer                       : CertKey Database Certificate
LastBackupDate               : 01/01/0001 00:00:00
Owner                        : dbo
PrivateKeyEncryptionType     : Password
Serial                       : c1 51 6e d0 f5 ea 35 f8
#>
```

### [Get-DbaDbCertificate](https://docs.dbatools.io/#Get-DbaDbCertificate)

```powershell
# list all the certificates
Get-DbaDbCertificate -SqlInstance $server | Format-Table

<#
ComputerName InstanceName SqlInstance  Database Name                                                                    Subject                           
------------ ------------ -----------  -------- ----                                                                    -------                           
localhost    MSSQLSERVER  e6928404da5d master   ##MS_AgentSigningCertificate##                                          MS_AgentSigningCertificate        
localhost    MSSQLSERVER  e6928404da5d master   ##MS_PolicySigningCertificate##                                         MS_PolicySigningCertificate       
localhost    MSSQLSERVER  e6928404da5d master   ##MS_SchemaSigningCertificate8CAFA80B4BDA63350F588D8F60D61E8EAA3FECC0## MS_SchemaSigningCertificate8CAF...
localhost    MSSQLSERVER  e6928404da5d master   ##MS_SmoExtendedSigningCertificate##                                    MS_SmoExtendedSigningCertificate  
localhost    MSSQLSERVER  e6928404da5d master   ##MS_SQLAuthenticatorCertificate##                                      MS_SQLAuthenticatorCertificate    
localhost    MSSQLSERVER  e6928404da5d master   ##MS_SQLReplicationSigningCertificate##                                 MS_SQLReplicationSigningCertifi...
localhost    MSSQLSERVER  e6928404da5d master   ##MS_SQLResourceSigningCertificate##                                    MS_SQLResourceSigningCertificate  
localhost    MSSQLSERVER  e6928404da5d msdb     ##MS_AgentSigningCertificate##                                          MS_AgentSigningCertificate        
localhost    MSSQLSERVER  e6928404da5d msdb     ##MS_SchemaSigningCertificate8CAFA80B4BDA63350F588D8F60D61E8EAA3FECC0## MS_SchemaSigningCertificate8CAF...
localhost    MSSQLSERVER  e6928404da5d keys     CertKey                                                                 CertMsdb Database Certificate 
#>
```

### [Backup-DbaDbCertificate](https://docs.dbatools.io/#Backup-DbaDbCertificate)

```powershell
# backup the certificates
Backup-DbaDbCertificate -SqlInstance $server -EncryptionPassword $securePassword -DecryptionPassword $securePassword

<#
Certificate  : CertKey
ComputerName : localhost
Database     : keys
InstanceName : MSSQLSERVER
Key          : Password required to export key
Path         : /var/opt/mssql/data/\CertKey202009152318431843.cer
SqlInstance  : e6928404da5d
Status       : Success
#>
```

### [Remove-DbaDbCertificate](https://docs.dbatools.io/#Remove-DbaDbCertificate)

```powershell
# removed a given certificate 
Remove-DbaDbCertificate -SqlInstance $server -Certificate CertKey -Confirm:$false

<#
ComputerName : localhost
InstanceName : MSSQLSERVER
SqlInstance  : e6928404da5d
Database     : keys
Certificate  : CertKey
Status       : Success
#>
```

### [Restore-DbaDbCertificate](https://docs.dbatools.io/#Restore-DbaDbCertificate)

```powershell
# restore the certificate from the backup
Restore-DbaDbCertificate -SqlInstance $server -Path '/var/opt/mssql/data/\CertMsdb2020091523230623620200916120717717.cer' -Database keys -EncryptionPassword $securePassword -DecryptionPassword $securePassword -Confirm:$false

<#
ComputerName                 : localhost
InstanceName                 : MSSQLSERVER
SqlInstance                  : e6928404da5d
Database                     : keys
Name                         : CertMsdb2020091523230623620200916120717717
Subject                      : CertMsdb Database Certificate
StartDate                    : 15/09/2020 00:00:00
ActiveForServiceBrokerDialog : True
ExpirationDate               : 15/09/2025 00:00:00
Issuer                       : CertMsdb Database Certificate
LastBackupDate               : 01/01/0001 00:00:00
Owner                        : dbo
PrivateKeyEncryptionType     : Password
Serial                       : c7 64 80 e0 c4 e6 f4 37
#>
```

That post concludes the series of twelve summer Wednesdays with the dbatools as command-line version of SQL Server Management Studio.

Thank you, 

Mikey
