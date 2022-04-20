---
ref: chocolatey_intro
title: Poznaj chocolatey
excerpt: 
tags: [polski, chocolatey, community, tools]
categories: [polski, tools, chocolatey]
lang: pl
locale: pl-PL
permalink: /:title/
---

![Chocolatey](/assets/images/chocolatey.jpeg)

Ostatnio kupiłem nowy laptop i zdecydowałem, że zainstaluję na nim oprogramowanie za pomocą skryptów - wszystko po to by uniknąć zbędnego klikania i ściągania rzeczy ręcznie. Słyszałem w przeszłości o Chocolatey, jednak nie miałem okazji go przetestować. Nowy laptop to doskonały pretekst żeby pobawić się czekoladą.

# Co to jest Chocolatey?
Każdy kogo znam uwielbia czekoladę, więc cokolowiek ma w nazwie "czeko"/"**choco-**" musi zadziałać. Poniżej znajduje się kilka słów ze [strony](https://chocolatey.org/how-chocolatey-works) twórców usługi;

> Chocolatey jest rozwiązaniem do zarządzania oprogramowaniem które daje ci wolność tworzenie prostych pakietów oprogramowania i wdrażania gdziekolwiek używasz środowiska Windows wraz ze znajomą konfiguracją czy narzędziami zarządzania systemem.
> Zostało zaprojektowane w taki sposób, by było łatwe w użyciu i dostarczało pakiet poteżnych funkcjonalności, które można skalować w obecnej i przyszłej infrastrukturze. Moc i elastyczność w jednym prostym produkcie - to właśnie Chocolatey.

# Instalacja Chocolatey
Oficjalna instrukcja znajduje się [tutaj](https://chocolatey.org/install), a także jako [rozszerzony kurs instalacji](https://chocolatey.org/courses/installation/installing). Jeśli czas Cię nagli, podążaj za poniższymi krokami: 

```powershell
# Uruchom Get-ExecutionPolicy. 
# Jeśli zwrócony wynik to Restricted uruchom Set-ExecutionPolicy AllSigned lub Set-ExecutionPolicy Bypass -Scope Process.
PS C:\> Get-ExecutionPolicy
<#
Restricted
#>

# Bypass - nic nie będzie blokowane, i nie będą wyświetlane ostrzeżenia oraz monity.
PS C:\> Set-ExecutionPolicy Bypass -Scope Process -Force

# Now run the following command:
PS C:\> [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
<#
Getting latest version of the Chocolatey package for download.
Getting Chocolatey from https://chocolatey.org/api/v2/package/chocolatey/0.10.15.
Downloading 7-Zip commandline tool prior to extraction.
Extracting ...
Installing chocolatey on this machine
...
#>


# confirm the choco is in the house
PS C:\> choco -v
<#
0.10.15
#>
```

# Instalacja pakietów

Świetnie, właśnie nabyłeś nowiutkie narzędzie. Co teraz? Jak zdobyć pozostałe aplikacje? 
Jednym ze sposobów jest przeszukanie zasobów [biblioteki Chocolatey](https://chocolatey.org/packages) w celu znalezienia konkretnego pakietu.
Można to zrobić także z poziomu konsoli PowerShell:

```powershell
PS C:\> choco list
```

Gdy znajdziesz już pożądany pakiet, instalacja go jest prosta:

```powershell
# To jest przyjkład z mojego skryptu
PS C:\> choco install slack -y
PS C:\> choco install docker-desktop -y
PS C:\> choco install grammarly -y
PS C:\> choco install sql-server-management-studio -y
PS C:\> choco install greenshot -y
PS C:\> choco install opera -y
PS C:\> choco install vscode -y
...
# w bibliotece znajdują się także rozszerzenia VS Code
PS C:\> choco install vscode-powershell -y
PS C:\> choco install vscode-gitlens -y
PS C:\> choco install vscode-docker -y

# aby zobaczyć zainstalowane pakiety ruchom poniższe polecenie (zwróc uwagę na przełącznik **-localonly**)
PS C:\> choco list -localonly
```

Z pewnością zauważyłeś przełącznik **-y** na końcu każdej linii. Ma on konkretną funkcję:

```powershell
<#
Pakiet putty.install wymaga uruchomienia pliku 'chocolateyInstall.ps1'.
Uwage: Jeśli nie uruchomisz tego skryptu, process instalacji nie powiedzie się.
Uwaga: Aby potwierdzić instalację automatycznie na przyszłość, użyj przełącznika '-y' lub zmień ustawienie::
choco feature enable -n allowGlobalConfirmation
#>
```

# Aktualizacja pakietów

Aktualizacja pakietów do nowej wersji, lub samego Chocolatey jest bardzo prosta.

```powershell
# aktualizacja wielu pakietów jednocześnie
PS C:\> choco upgrade greenshot grammarly -y
<# One package was already on the latest version
Chocolatey upgraded 1/2 packages. 
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).
#>

# aktualizacja Chocolatey
PS C:\> choco upgrade chocolatey -y
```

# Usuwanie pakietów

Aby odinstalować pakiet stosujamy podobny schemat.

```powershell
# dobrze jest mieć zainstalowany pakiet, który chcemy odinstalować
PS C:\> choco uninstall putty.install

<# w przeciwnym razie...
Uninstalling the following packages:
putty.install
putty.install is not installed. Cannot uninstall a non-existent package.
...
```

po poprawkach (zainstalowaniu pakietu) usunięcie aplikacji wygląda następująco

```powershell
...
putty.install v0.73
 Running auto uninstaller...
 Auto uninstaller has successfully uninstalled putty.install or detected previous uninstall.
 putty.install has been successfully uninstalled.

Chocolatey uninstalled 1/1 packages. 
 See the log for details (C:\ProgramData\chocolatey\logs\chocolatey.log).
#>
```

# Some issues

Since it was my first time with Chocolatey I observed some issues, but so far only two were noticeable enough to make a note. The first one was a missing **-y** switch, which is not a typical issue but stopped me for a while.

The other thing is that Chocolatey sometimes stalls for a long time. Like a really long time. At some point, after waiting 30 minutes I had to kill the choco process and that helped.

# Więcej informacji

Szukając informacji na temat Chocolatej znalazłem kilka interesujących stron i materiałów:
[Lista parametrów z opisami](https://gist.github.com/yunga/99d04694e2466e017c5502d7c828d4f4) w skróconej wersji. 

Post na blogu Kendry Little ([blog](http://sqlworkbooks.com/)\|[twitter](https://twitter.com/Kendra_Little)) o instalacji narzędzi Redgate [o instalacji narzędzi Redgate [en]](https://littlekendra.com/2019/12/02/installing-redgate-sql-toolbelt-with-chocolatey/) + plus kilka intetesujacych linków oraz [Chocolatey GUI](https://chocolatey.github.io/ChocolateyGUI/about).

Dziękuję,

Mikey
