const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => {
    user.name == name && user.room == room;
  });

  if (existingUser) {
    return { error: "Username taken" };
  }

  user = { id, name, room };

  users.push(user);

  return { user };
};

const removeUser = (id) => {
  const userInd = users.findIndex((user) => user.id);

  if (userInd != -1) {
    return users.splice(userInd, 1)[0];
  }
};

const getUsers = (id) => {
  return users.find((user) => user.id == id);
};

const getUsersInRoom = (room) => {
  return users.filter((user) => user.room == room);
};

module.exports = { addUser, removeUser, getUsers, getUsersInRoom };
