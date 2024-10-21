call npm run build
if %ERRORLEVEL% equ 0 (
	call CopyBuild.bat
) else (
	echo Build Failed with error %ERRORLEVEL%
	pause
)