# not-a-toast
`not-a-toast` is a lightweight, customizable, and highly versatile JavaScript library for displaying beautiful and professional toast notifications on your web applications. With a wide range of options for customization, animations, themes, and more, you can create engaging and informative notifications that seamlessly integrate with your UI.

![Project Demo GIF](https://github.com/shaiksharzil/not-a-toast/blob/main/src/assets/not-a-toast.gif)

## Key Features of `not-a-toast`
- Lightweight & Easy to Use
- Fully Customizable Toasts
- 40+ Built-in Visual Themes
- Custom Toast Support
- Reverse Toast Order
- 33 Entry & Exit Animations
- Async (Promise) Toast Support
- Toast Update Support
- Auto-Close & Duration Control
- Progress Bar Support
- Action Button with Callback
- Rich Icon System & Animations
- Custom HTML Toast Content
- Remove All Toast Fuction

## Demo
Check out the live demo to see not-a-toast in action:https://not-a-toast.vercel.app/

## Installation
You can add not-a-toast to your project using either npm or by including it directly in your HTML file via a CDN.
### Via npm
This is the recommended method for modern web applications.

1. Install the package:
```js
npm install not-a-toast
```
2. Import and use it in your project:
```js
// 1. Import the toast function and its stylesheet
import toast from 'not-a-toast';
import 'not-a-toast/style.css';

// 2. Use it in your application
toast({ message: 'Hello from npm! 👋' });
```

### Via CDN
Use this method for quick demos or projects without a build step.

1. Add the following lines to your HTML file:
  This will make the toast() function globally available in your script.

```html
<!DOCTYPE html>
<html>
<head>
  <title>Not-a-Toast Demo</title>
  <!-- Stylesheet CDN -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/not-a-toast@1.1.5/dist/style.css">
</head>
<body>

  <button onclick="showMyToast()">Show Toast!</button>
  <!-- Script CDN -->
  <script src="https://cdn.jsdelivr.net/npm/not-a-toast@1.1.5/dist/not-a-toast.umd.js"></script>

  <script>
    function showMyToast() {
      toast({ message: 'Hello from the CDN! 🚀' });
    }
  </script>

</body>
</html>
```
## Documentation
### Basic Usage
To display a basic toast notification, simply call the `toast()` function with a message:
```js
toast({ message: "Hello not-a-toast" });
```

### Options
`not-a-toast` offers a rich set of options to customize your toasts. Below are the detailed options you can use:
### `message` (Required)
The primary content of your toast notification.

```js
toast({ message: "Hello not-a-toast" });
```
### Duration
Controls how long the toast remains visible in milliseconds. Defaults to a standard duration.

```js
toast({ message: "Duration", duration: 5000 }); // Toast will disappear after 5 seconds
```
### Multiline Toasts
You can display multiline messages in your toasts by using newline characters (`\n`).
```js
toast({
  message: `This is a long toast message with additional details.\n\nYou can continue reading while the toast remains visible.`,
  duration: 6000,
});
```
### positions
Determines where the toast appears on the screen. There are 6 available positions:
- `top-left`
- `top-center`
- `top-right`
- `bottom-left`
- `bottom-center`
- `bottom-right`
```js
toast({ message: "Position", position: "top-right" });
```
### Order reversed
If set to `true`, new toasts will appear below existing toasts in the same position. Defaults to `false`.
```js
toast({ message: "orderReversed", orderReversed: true });
```
### Entry animation
Specifies the animation applied when the toast enters the viewport. Choose from 20 exciting animations: `fadeIn`, `zoomIn`, `slideInLeft`, `slideInRight`, `slideInUp`,`slideInDown`, `bounceIn`, `flipInX`, `flipInY`, `rotateIn`, `punchIn`, `bubbleUp`, `swirlIn`, `wobbleIn`, `tiltUp`, `windRightIn`, `windLeftIn` , `squeezeIn`, `fadeSlideZoomIn`, `helixSpinIn`, `meteorDropIn`, `portalIn`, `cubeSpinIn`, `jellyPopIn`, `rippleIn`, `glitchIn`, `swingDownIn`, `glideIn`, `curtainIn`, `slinkyIn`, `sparkIn`, `dustIn`, and `driftIn`
```js
toast({ message: "entryAnimation", entryAnimation: "dustIn" }):
```
### Exit animation
Specifies the animation applied when the toast exits the viewport. Choose from 20 exciting animations: `fadeOut`, `zoomOut`, `slideOutLeft`, `slideOutRight`, `slideOutUp`, `slideOutDown`, `bounceOut`, `flipOutX`, `flipOutY`, `rotateOut`, `punchOut`, `bubbleDown`, `swirlOut`, `wobbleOut`, `tiltDown`, `windRightOut`, `windLeftOut`, `squeezeOut`, `fadeSlideZoomOut`, `helixSpinOut`, `meteorZoomOut`, `portalOut`, `cubeSpinOut`, `jellyPopOut`, `rippleOut`, `glitchOut`, `swingUpOut`, `glideOut`, `curtainOut`, `slinkyOut`, `sparkOut`, `dustOut`, and `driftOut`
```js
toast({ message: "exitAnimation", exitAnimation: "dustOut" });
```

### Custom Entry and Exit Animations
You can provide custom entry and exit animations by creating CSS `@keyframes` with your desired styles. 

**Important:** Add the prefix `notAToast` to your animation names in CSS, but when passing them to the `toast` function, provide the name without the prefix.

```css
/* In your CSS file */
/* Add the prefix 'notAToast' to your animation names in CSS */

@keyframes notAToastfoldIn {
  0% { transform: scaleY(0) rotateX(-90deg); opacity: 0; transform-origin: top; }
  100% { transform: scaleY(1) rotateX(0); opacity: 1; }
}

@keyframes notAToastfoldOut {
  0% { transform: scaleY(1) rotateX(0); opacity: 1; }
  100% { transform: scaleY(0) rotateX(90deg); opacity: 0; }
}
```
```js
// javascript
toast({
  message: 'This toast uses Fold animations',
  entryAnimation: 'foldIn', // without 'notAToast' prefix
  exitAnimation: 'foldOut'  // without 'notAToast' prefix
});
```
### Themes
Apply a predefined theme to your toast. There are over 40 themes available, categorized as follows:
#### Glass & Frosted:
`glassmorphism`, `liquidGlass`, `sonoma`, `blackGlass`, `xrayOverlay`
#### Dark Themes:
`neumorphicDark`, `materialDark`, `terminal`, `terminalGreen`, `darkMatter`, `gothicMist`, `aetherGrid`, `neonGlow`
#### Modern/Design Inspired:
`neumorphic`, `brutal`, `skewed`, `solarizedDark`, `carbon`, `blueprintSketch`
#### Minimal & Subtle:
`default`, `minimal`, `focus`, `dotted`, `typewriterNote`, `notebookSketch`
#### Colorful & Fun:
`rainbow`, `gradient`, `cyberpunk`, `web3`, `warningAlert`, `cautionTape`, `legoBrick`, `pixelRetro`, `stickyNote`, `cardboard`
#### Skeuomorphic:
`woodGrain`, `cardboard`, `clay`, `chalkboard`, `ironMesh`, `circuitBoard`
```js
toast({ message: "Themes", theme: "liquidGlass" });
```
#### Custom Themes
You can define your own custom theme by creating a CSS class with your desired styles and passing its name to

**Important:** Add the prefix `notAToast` to your CSS class name, but when passing it to the `toast` function, use the name without the prefix.
```css
/* In your CSS file */
/* Add the prefix 'notAToast' to your CSS class name */
.notAToastcustomTheme {
   background: linear-gradient(to right, #4caf50, #8bc34a);
   color: white;
   border: 2px solid #388e3c;
/* Add other styles as needed */
}
```
```js
//javascript
toast({ 
  message: "Custom theme", 
  theme: "customTheme"  // without 'notAToast' prefix
});
```
### Styling Toast
You can directly style individual toasts by passing CSS properties as options. This allows for fine-grained control over the toast's appearance.

Available styling properties: `background`, `color`, `border`, `borderRadius`, `fontSize`, `fontFamily`, `opacity`.

```js
toast({
  message: "Styling toast",
  background: "green",
  color: "white",
  borderRadius: "10px",
  fontSize: "1.1rem",
});

// You can also pass gradient colors for background
toast({
  message: "Gradient Background!",
  background: "linear-gradient(to right, #ff7e5f, #feb47b)",
  color: "white",
});
```
### Auto close
If set to `false`, the toast will not close automatically and must be closed manually. Defaults to `true`.
```js
toast({ message: "Auto close", autoClose: false }); // User needs to close this manually
```
### Pause on hover
If `true` (default), hovering over the toast will pause its countdown and animation. Set to `false` to disable this behavior.
```js
toast({ message: "Pause on hover", pauseOnHover: false });
```
### Progress Bar
The progress bar visually indicates the remaining duration of the toast. By default, its color matches the toast's color and it pauses on hover.
- `showProgressBar`: `true` by default. Set to `false` to hide.
- `progressBarColor`: Change the color of the progress bar.
- `progressBarHeight`: Adjust the height (e.g., `"0.2rem"`).
- `progressBarPosition`: Position the progress bar at `"top"` or `"bottom"`.
- `progressBarAnimation`: Apply progress bar animations. There are six types: `"slideInLeft"`, `"slideInRight"`, `"shrinkLeft"`, `"shrinkRight"`, `"expand"`and `"collapse"`.

```js
toast({
  message: "Progress Bar",
  showProgressBar: true,
  progressBarColor: "white",
  progressBarPosition: "top",
  progressBarAnimation: "collapse",
});
```
### Custom Progress Bar Animation
You can also define a custom progress bar animation by creating your own CSS `@keyframes`.

**Important:** Prefix the animation name with `notAToast` in CSS, but when passing it to the `toast` function, provide the name without the prefix.
```css
/* In your CSS file */
/* Add the prefix 'notAToast' to your animation names in CSS */
@keyframes notAToastslideProgress {
  0% { width: 100%; background: limegreen; }
  50% { width: 50%; background: orange; }
  100% { width: 0%; background: red; }
}
```
```js
toast({
  message: 'This toast has a custom progress bar',
  progressBarAnimation: 'slideProgress' // without 'notAToast' prefix
});
```

### Close Button ( ✕ )
A customizable close button allows users to dismiss the toast.
- `showCloseButton`: `true` by default. Set to `false` to hide.
- `closeButtonColor`: Change the color of the close button.
- `closeButtonSize`: Adjust the size (e.g., `"1rem"`).

```js
toast({
  message: "Close button",
  showCloseButton: true,
  closeButtonColor: "red",
  closeButtonSize: "10px",
});
```
### Action Button
Add an interactive button to your toast to allow users to perform actions.
- `showActionButton`: `false` by default. Set to `true` to display the button.
- `actionButtonLabel`: The text displayed on the button. The button will only show if both `actionButtonLabel` and `showActionButton` are `true`.
- `actionButtonTheme`: By default, the action button adopts the toast's `theme`. You can override this by providing a specific theme name (one of the predefined themes) or a custom CSS class name.
- `onAction`: A function to execute when the action button is clicked.

```js
toast({
  message: "Action Button",
  showActionButton: true,
  actionButtonLabel: "Click me to see a toast",
  actionButtonTheme: "liquidGlass",
  onAction: () => toast({ message: "Another toast!" }), // Example: showing another toast on click
});
```
#### Styling Action Button
You can style the action button independently using the following properties:
`actionButtonColor`, `actionButtonBackground`, `actionButtonPadding`, `actionButtonMargin`, `actionButtonBorder`, `actionButtonBorderRadius`, `actionButtonFontSize`, `actionButtonFontFamily`, `actionButtonOpacity`, `actionButtonShadow`.
```js
toast({
  message: "Styling Action Button",
  showActionButton: true,
  actionButtonLabel: "Click me to see a toast",
  actionButtonTheme: "liquidGlass",
  onAction: () => toast({ message: "Hello not-a-toast" }), // Ensure this is a valid function call
  actionButtonColor: "red",
  actionButtonBackground: "white",
  actionButtonPadding: "0.5rem 1rem",
  actionButtonBorder: "1px solid red",
  actionButtonBorderRadius: "5px",
});
```
  #### Close  Toast By Using OnAction
```js
onAction: (x) => { x.close() },
```
### Custom Action Button Theme
You can customize the action button by defining your own CSS theme class.

**Important:** Prefix the class name with `notAToast` in CSS, but when passing it to the `toast` function, provide the name without the prefix.
```css
/* In your CSS file */
/* Add the prefix 'notAToast' to your CSS class name */
.notAToastmyButtonTheme {
  background: linear-gradient(135deg, #6366f1, #4338ca); /* Indigo gradient */
  color: #fff;
  border: none;
  border-radius: 999px; /* pill-shaped */
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.3px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(67, 56, 202, 0.3);
  transition: all 0.3s ease;
}

.notAToastmyButtonTheme:hover {
  background: linear-gradient(135deg, #4f46e5, #312e81);
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 6px 14px rgba(67, 56, 202, 0.4);
}
```
```js
toast({
    message: "This toast has a custom action button theme",
    showActionButton: true,
    actionButtonLabel: "Close",
    actionButtonTheme: "myButtonTheme", // without 'notAToast' prefix
    onAction: (x) => { x.close() }, 
  });
```
### Icons
Add an icon to the beginning of your toast message for better visual communication.
- `showIcon`: `false` by default. Set to `true` to display an icon.
- `iconType`: You can specify predefined icon types: `success`, `error`, `info`, `warn`, and `loader` (for promise toasts). `iconType` will adopt the toast's theme by default.
- `icon`: Provide a custom emoji or an SVG string. When using SVG, ensure `fill="currentColor"` for better customization.
```js
// Show a success icon
toast({ message: "Icon types", showIcon: true, iconType: "success" });

// Show an emoji
toast({ message: "Emoji", showIcon: true, icon: "👋" });

// Show a custom SVG icon
toast({
  message: "Custom SVG icon",
  showIcon: true,
  icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path></svg>`,
});
```
#### Icon Styling
Customize the appearance of the icon:
- `iconBackground`
- `iconColor`
- `iconBorderRadius`: Defaults to `"50%"` for a circular icon.
```js
toast({
  message: "Icon Styling",
  showIcon: true,
  iconBackground: "black",
  iconColor: "white",
  iconBorderRadius: "8px",
});
```
#### Icon Animation
Apply animations to your icons for more dynamic feedback.
- `iconAnimation`: Apply icon animations. There are 11 types: `default`, `bounce`, `spin`, `pulse`, `wave`, `flipX`, `flipY`, `shakeX`, `shakeY`, `jelly` and `rubberBand`
- `iconTimingFunction`: Animation timing function (e.g., `"ease"`, `"infinite"`).

```js
toast({
  message: "Icon Animation",
  showIcon: true,
  icon: "🚀",
  iconAnimation: "jelly",
  iconTimingFunction: "infinite",
});
```
### Custom Icon Animation
You can also define a custom animation for the toast icon using CSS `@keyframes`.

**Important:** Prefix the animation name with `notAToastIcon` in CSS, but when passing it to the `toast` function, provide the name without the prefix.
```css
/* In your CSS file */
/* Add the prefix 'notAToastIcon' to your animation names in CSS */
@keyframes notAToastIcontada {
  0% { transform: scale(1); }
  10%, 20% { transform: scale(0.7) rotate(-6deg); }
  30%, 50%, 70%, 90% { transform: scale(1.3) rotate(6deg); }
  40%, 60%, 80% { transform: scale(1.3) rotate(-6deg); }
  100% { transform: scale(1) rotate(0); }
}
```
```js
toast({
    message: "Tada icon animation",
    showIcon: true,
    icon: "🎉",
    iconAnimation: "tada", // without 'notAToastIcon' prefix
});
```

### Reusable Toast Styling: Define Once, Use Anywhere
#### Define the Styling Once
```js
const styling = {
  background: "linear-gradient(to right, #2c3e50, #4ca1af)",
  color: "white",
  border: "1px solid white",
  borderRadius: "8px",
  fontSize: "1rem",
};
```
#### Use It Multiple Times
```js
toast({...styling, message: "Style once and use more!",});

toast({...styling, message: "Another toast with the same style!", position: "bottom-right",});
```
### Custom Toast Content
For ultimate flexibility, you can provide your own HTML structure for the toast content. When using a custom toast, you still have access to `duration`, `entryAnimation`, `exitAnimation`, `pauseOnHover`, and `position`.

**Important:** To enable closing your custom toast, ensure you include an element with the class `toastCloseButton` within your custom HTML. Clicking this element will dismiss the toast.





```js
toast({
  customToast: `
    <div class="notify-toast-body">
        <div class="notify-toast-avatar">
           <img src="[https://randomuser.me/api/portraits/women/44.jpg](https://randomuser.me/api/portraits/women/44.jpg)" alt="User" />
        </div>
        <div class="notify-toast-content">
           <p class="notify-toast-title">Emma Johnson</p>
           <p class="notify-toast-message">You have a new message waiting.</p>
        </div>
       <div class="notify-toast-close">
           <button class="toastCloseButton">&times;</button>
        </div>
    </div>`,
  duration: 5000,
  entryAnimation: "slideInRight",
})
```
## Updating a Toast
You can dynamically change an existing toast's properties after it has been displayed. This is perfect for showing loading states that transition to success or error messages.

When you create a toast, the `toast()` function returns an instance that has an `update()` method.

```js
const myToast = toast({
  message: "Uploading your file...",
  iconType: "loader",
  duration: 0, // Keep it open until updated
});

// After an async operation or a delay...
setTimeout(() => {
  myToast.update({
    message: "File uploaded successfully!",
    iconType: "success",
    theme: "glassmorphism", // You can even change the theme!
    duration: 4000, // Now it will auto-close
  });
}, 2000);
```

  ### What can you update?
  You can update almost any property of the toast by passing a new configuration object to the `update()` method. This includes:
-   **Content:** `message`, `customToast`
-   **Appearance:** `theme`, `background`, `color`, `border`, `borderRadius`
-   **Icons:** `icon`, `iconType`, `iconColor`, `iconBackground`, etc.
-   **Behavior:** `duration`, `autoClose`, `pauseOnHover`
-   **Components:**
    -   **Progress Bar:** `showProgressBar`, `progressBarColor`, `progressBarPosition`, `progressBarAnimation`
    -   **Action Button:** `showActionButton`, `actionButtonLabel`, `onAction`
    -   **Close Button:** `showCloseButton`, `closeButtonColor`
## Promise Toasts
`not-a-toast` provides a convenient way to display the status of asynchronous operations (like API calls) using promise toasts. You can show a loading state, and then update the toast with success or error messages.
**Key Points for Promise Toasts:**
- Set `duration: 0` for the initial loading toast to prevent it from auto-closing.
- Use `iconType: "loader"` for the loading toast to display a spinning loader icon.
- Call `<variable>.close()` to manually dismiss the loading toast once your promise resolves or rejects. For example, if you assigned the toast to a variable (`const t = toast({...})`), you would call `t.close()`.
```js
async function testApiToast() {
  const t = toast({
    message: "Fetching post...",
    duration: 0,
    showIcon: true,
    iconType: "loader",
  });
  try {
    const res = await fetch("https://picsum.photos/v2/list?page=2&limit=100");
    const data = await res.json();
    t.update({
      message: "successfully fetched posts",
      iconType: "success",
      duration: 4000,
    });
  } catch (err) {
    t.update({
      message: "error occurs while fetching posts",
      iconType: "error",
      duration: 4000,
    });
  }
}

testApiToast();
```

## Remove All Toasts
You can clear all active toast notifications at once using the `removeAllToasts` function.
#### Example (npm / ES module):
```js
// Import 'removeAllToasts' from "not-a-toast"
import toast, { removeAllToasts } from "not-a-toast";
import "not-a-toast/style.css";

toast({ message: "First toast" });
toast({ message: "Second toast" });

// Remove all active toasts
removeAllToasts();
```
#### Example (CDN / UMD):
```js
<!-- With CDN, you can use 'removeAllToasts()' directly -->
<script>
  toast({ message: "First toast" });
  toast({ message: "Second toast" });

  // Remove all active toasts
  removeAllToasts();
</script>
```

## Support
If you find this library useful, please consider giving it a [star](https://github.com/shaiksharzil/not-a-toast) ⭐ on GitHub! Your support helps motivate me to maintain and improve it.