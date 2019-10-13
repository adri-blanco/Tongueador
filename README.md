<h1 align="center">Tongueador</h1>
<p align="center">A buzz game support system</p>

This is a buzzer system to give more excitement to your quiz game. It's so simple to use. Just connect a USB encoder and some buttons, start the server and have fun!

## Getting started

Run this two commands to start:
```
  $ npm run start:back
  $ npm run start:front
```

### Configuration

All the info related to your USB card or your teams, are all updateable in one file, `src/config.js`. Here you can modify the following info:

``` javascript
{
  usbEncoder: { // Info related to your physical encoder
    PID: 57345,
    VID: 2064
  }
  teams: {
    A: {
      teamKey: 'A',     // Unique id for this team
      teamName: 'Name',
      logo: 'https://[...].png' // Link to the team logo
      points: 300, // Current points of the team. Modify this when the team win some points.
      dataCode: '0280807f7f0f1000', // Code of the button inside the encoder. Check [...] to know how to get this.
      color: 'rgba(236, 243, 33, 0.65)'
    }
  }
}
```

### Get the data code of a button

Run the following command and follow the instructions to get the data code that should be inside the config for each team.

```
  $ npm run config
```