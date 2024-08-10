class Services {
    constructor(id, establishmentsId, serviceName, serviceImage, duration, price) {
      this.id = id;
      this.establishmentsId = establishmentsId;
      this.serviceName = serviceName;
      this.serviceImage = serviceImage;
      this.duration = duration;
      this.price = price;
    }
  
    static fromJson(json) {
      return new Services(
        json['id'],
        json['establishmentId'],
        json['serviceName'],
        json['serviceImage'],
        json['duration'],
        json['price']
      );
    }
  }
  
  export default Services;
  