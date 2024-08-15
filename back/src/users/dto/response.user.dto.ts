export class UserResponseDto {
    name: string;
    email: string;
    address: string;
    phone: number;
    country?: string;
    city?: string;
  
    constructor(partial: Partial<UserResponseDto>) {
      const { name, email, address, phone, country, city } = partial;
      this.name = name;
      this.email = email;
      this.address = address;
      this.phone = phone;
      this.country = country;
      this.city = city;
    }
  }