@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo Начало переименования...
echo.

for %%F in (*.jpg *.jpeg *.png *.JPG *.JPEG *.PNG) do (
    if exist "%%F" (
        :: Получаем расширение и приводим к нижнему регистру
        set "ext=%%~xF"
        set "ext=!ext:JPG=jpg!"
        set "ext=!ext:JPEG=jpeg!"
        set "ext=!ext:PNG=png!"
        
        :: Генерируем случайное имя из 8 цифр
        set "rand=!random!!random!"
        set "rand=!rand:~0,8!"
        
        set "newName=!rand!!ext!"
        set "c=1"
        
        :: Проверка на совпадение имен (на всякий случай)
        :loop
        if exist "!newName!" (
            set "newName=!rand!_!c!!ext!"
            set /a c+=1
            goto loop
        )
        
        :: Переименовываем
        ren "%%F" "!newName!"
        echo Переименовано: %%F  --^>  !newName!
    )
)

echo.
echo Готово! Нажмите любую клавишу для выхода...
pause >nul