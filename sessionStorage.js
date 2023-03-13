const sessions = new Map();

    const findSession = (id) => {
      return sessions.get(id);
    }
  
    const saveSession = (id, session) => {
      sessions.set(id, session);
    }
  
    const findAllSessions = () => {
      return [...sessions.values()];
    }

    module.exports = { findSession, saveSession, findAllSessions}