# Puma (Beta)

This is a simple plugin that links each frame in a selection so that you can present your slides in the shape of the PUMA. [Learn more about the PUMA](https://www.youtube.com/watch?v=7oeKKkbybR0) by Dan Roam.

## How to trial/install

To run this plugin you need to have the Figma Desktop app installed.

1. Download this repo and unzip
1. Open the Figma Desktop app
2. In any file open the Quick Actions menu by pressing `cmd/ctrl + /`
3. Type `Import plugin from manifest` and run the command
4. Look for the `manifest.json` file in the `dist` folder and select it

Then to run the plugin:

1. Select the frames you want to link
2. Open the Quick Actions menu and run the plugin `Puma`

## What this plugin does

This plugin scans the selection left to right for columns of frames and then links them together.

- Currently, it REPLACES all triggers so bear that in mind while you're testing.
- It doesn't link back to the previous frames because Figma automatically supports this using the left arrow key

## Please send me your feedback

You can either create an issue in this repo, or you can email me at support@gavinmcfarland.co.uk.

Thanks!

