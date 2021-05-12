# Assessment: Bulletin - weather application
A simple webpage to display weather forecast.

## Technologies used
- HTML5
- CSS3
- ES6

## How to use
Using the app is simple. Download the zip (or clone the repo). No need to compile anything. Open the index.html file in the /app folder.

## Libraries / Resources Used
- [Weather Icons](https://github.com/erikflowers/weather-icons)
- [IBM Plex Fonts](https://github.com/IBM/plex)
- [Furtive CSS](https://github.com/johno/furtive)
- [HTML5 Boilerplate Template](https://html5boilerplate.com)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Web Storage Code Example](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API)

## Future improvements & features
- Write tests
- Minify scripts and styles
- Clean up some code with templates to make them more modular and reusable
- Fine tune the views and make performance improvements
- Securing the API key
- Add more detailed views / grids about the weather per hour
- Add color in a way for users to easily see the temp / weather type at a glance
- Change the weather icons to thinner version (or map custom SVGs to the weather codes).
- Add visual transitions between views

## Process
### 1. Discovery
I sat down and asked myself the following questions:

**Why check on the weather?**
- What to anticipate right now and throughout the day (am I dressed appropriate for rain, snow, etc)
- Maybe planning your week and want to know what the weather will be in X days
    - If that’s the case, you’ll want the details of that day too
    - Going to the beach, hike, etc

**What do you need most?**
- Need to know the current weather and what it will be throughout the day
- If you go into a future day, what are those details

**Anything to help make this process easier?**
- Save the location so you don’t have to re-enter it every time you come back
- Fast visual way of seeing what the weather is (and will be)
- Weather sometimes sucks, you can’t change it, any way to help make things better? Gifs, playlists? Recipes?

**Considerations: API Rate-limiting**
There are limitations on most APIs. This one has a rate limit of “ Send requests from one API key no often than 1 per 10 minutes.” So it will be a good idea to cache calls.

### 2. Wireframing
**What do you want to see first / what's most important?**
- Icon of condition (or text)
- Current temp (high and low) with ability to switch to C/F
- Location
- Current date

**Screens**
- Welcome
- Error in finding location
- Dashboard of weather
- Settings for changing location / metric type

### 3. Prototypes
Before architecting the app, I like to figure out the main technologies and make coding prototypes to test them out and explore them. They're quick down and dirty examples. I explored the following (they can be found in /prototypes):

**OpenWeatherAPI**
*openweather-api.html* explored working with the multiple endpoints of the api and what data points were returned. I was able to make calls from the API and see what information I had access to in a real way. All of this was documented on their site but I also got a feel for how fast the api works as well.

**LocalStorage**
*localstorage.html* I knew there was going to be rate-limiting on the API (and also a way to save settings) and I thought localStorage would be a nice simple way to store these items.

**Browser Location / GeoLocation**
*get-location.html* I thought adding geolocation from the browser would be a nice touch to help automate and get the user to the weather as fast as possible.

**ES6 Templating**
*templating.html*
This is where I got to explore the templating in ES6 and converting the data returned from the API. I explored dates, temperature conversion, etc.

### 3. Design
I did some research to see what kinds of ways other people have resolved displaying the weather. I found some ideas which are attached in `/design` folder

### 4. Code

- It was a small requirements so decided against using a library like React or a framework like Angular/Vue.
- It was necessary to use only native technologies first-class to the browser, keeping things performant.
- A design which looks appealing was the key as there are numerous apps like this in the market. Standing out was important in my opinion.