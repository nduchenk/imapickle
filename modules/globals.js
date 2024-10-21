"use strict";
let UNIQ_OBJECT_ID = 0;

function getNextUniqObjectId() {
  return ++UNIQ_OBJECT_ID;
}

export { getNextUniqObjectId };
