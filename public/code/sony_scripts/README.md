# Sony Scripts Project

## Overview
This project contains the main gameplay logic and additional functions for a Unity-based application. The core gameplay is managed by the `Main_Gameplay.cs` file, which handles the state and behavior of the game, including cube interactions and light management.

## Project Structure
```
sony_scripts
├── Main
│   └── Main_Gameplay.cs        # Main gameplay logic
├── Functions
│   └── [other-function-files].cs # Additional functions and classes
├── README.md                   # Project documentation
```

## Main Gameplay Logic
- **Main_Gameplay.cs**: This file contains the `cubes_group_c_playground` class, which is responsible for managing the game state, handling cube lights, and implementing timers. It defines enums for `Colour` and `State`, and includes methods for setting and clearing cube lights, as well as managing state transitions.

## Functions Directory
- The `Functions` directory is intended for additional C# files that encapsulate specific functionalities related to the gameplay. Each file should be designed to be reusable and modular, allowing for better organization and maintainability of the code.

## Setup Instructions
1. Clone the repository to your local machine.
2. Open the project in Unity.
3. Ensure all necessary dependencies are installed.
4. Run the project to test the gameplay functionality.

## Usage Guidelines
- Modify the `Main_Gameplay.cs` file to adjust gameplay logic as needed.
- Add new functionalities by creating additional C# files in the `Functions` directory.
- Follow best practices for coding and documentation to maintain project clarity.

## Contributing
Contributions to the project are welcome. Please submit a pull request with your changes and a description of the modifications made.