import httpStatus from 'http-status';

class APISuccess {
  constructor(content, status = httpStatus.OK) {
    this.content = content;
    this.status = status;
    this.success = true;
  }
}

export default APISuccess;
