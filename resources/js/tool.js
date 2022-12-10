import Tool from './pages/Tool'

Nova.booting((app, store) => {
  app.component("DefaultField", require("./components/DefaultField").default);
  Nova.inertia('NovaFormDesigner', Tool)
})
