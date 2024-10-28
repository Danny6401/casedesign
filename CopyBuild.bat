cd ..
@REM pause
cd jsproject-lccnet/build
@REM pause
del /S /Q *.*
cd..
@REM pause
@REM rmdir /S /Q "D:\NodeProject\jsproject-lccnet\build\*"
for /D %%p in ("D:\NodeProject\jsproject-lccnet\build\*") do rmdir /S /Q "%%p"
robocopy "D:\NodeProject\casedesign\build" "D:\NodeProject\jsproject-lccnet\build" /E

cd ..
@REM pause
cd heroku/build
@REM pause
del /S /Q *.*
cd..
@REM pause
@REM rmdir /S /Q "D:\NodeProject\jsproject-lccnet\build\*"
for /D %%p in ("D:\NodeProject\heroku\build\*") do rmdir /S /Q "%%p"
robocopy "D:\NodeProject\casedesign\build" "D:\NodeProject\heroku\build" /E
