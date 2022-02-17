@echo off
  pushd C:\exmasconv
     for /f "delims=" %%i in ('dir /a-d/b/s *.js') do ren "%%i" "%%~ni.txt"
  popd
exit /b