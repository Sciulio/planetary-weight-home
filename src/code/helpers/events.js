const eventsMap = {};

const eventWrapperFactory = () => ({
  handlers: [],
  allowers: []
});

export const emitEvent = (event, ...args) => {
  if (eventsMap[event].allowers.every(func => func(...args))) {
    console.log(" - emitting event:", event);
    eventsMap[event].handlers.forEach(func => func(...args));
  } else {
    console.log(" - emitting NOT event:", event);
  }
}

export const registerAllowers = (event, ...funcs) => {
  console.log(" - registering allowers:", event); // , ...funcs);
  (eventsMap[event] || (eventsMap[event] = eventWrapperFactory())).allowers.push(...funcs)
};

export const registerEvents = (event, ...funcs) => {
  console.log(" - registering event:", event); // , ...funcs);
  (eventsMap[event] || (eventsMap[event] = eventWrapperFactory())).handlers.push(...funcs)
};