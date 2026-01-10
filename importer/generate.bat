@echo off
REM Quick script for generating questions on Windows
REM Usage: generate.bat 10 classes-and-objects

if "%1"=="" (
    echo Usage: generate.bat [questions] [lecture]
    echo.
    echo Examples:
    echo   generate.bat 10 classes-and-objects
    echo   generate.bat 20 oop-concepts
    echo.
    echo Or generate for all lectures:
    echo   generate.bat 5
    exit /b 1
)

if "%2"=="" (
    echo Generating %1 questions for ALL lectures...
    python generate_questions.py -q %1
) else (
    echo Generating %1 questions for %2...
    python generate_questions.py -q %1 -l %2
)
