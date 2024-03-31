import os, subprocess, jsonify
def execute(text):
    words = text.split()
    directory = "C://"
    if directory:
        # Execute the appropriate command based on the operating system
        if os.name == 'nt':  # Check if the operating system is Windows
            command = 'dir /ad /b "{}"'.format(directory)
        else:  # Assume Unix-like system
            command = 'ls -l "{}" | grep "^d" | awk "{{print $NF}}"'.format(directory)

        try:
            # Execute the command and capture the output
            result = subprocess.run(command, shell=True, capture_output=True, text=True)
            output = result.stdout.strip()
            error = result.stderr.strip()
            
            if output:
                folders = output.split('\n')
                return folders
            elif error:
                return  error
            else:
                return 'folders'
        except Exception as e:
            return str(e)
    else:
        return 'Directory not specified in the request.'