import { VehicleInfo } from './models/vehicle-info';
import { SearchFilterPipe } from './search-filter.pipe';

describe('SearchFilterPipe', () => {
  const pipe = new SearchFilterPipe();
  const items: VehicleInfo[] = [
    {
      status: 'Online',
      owner_address: 'Cementvägen 8, 111 11 Södertälje',
      owner_name: 'Kalles Grustransporter AB',
      id: 'v1',
      registration_number: 'ABC123',
      vehicle_id: 'YS2R4X20005399401'
    },
    {
      status: 'Online',
      owner_address: 'Cementvägen 8, 111 11 Södertälje',
      owner_name: 'Kalles Grustransporter AB',
      id: 'v2',
      registration_number: 'DEF456',
      vehicle_id: 'VLUR4X20009093588'
    },
    {
      status: 'Online',
      owner_address: 'Cementvägen 8, 111 11 Södertälje',
      owner_name: 'Kalles Grustransporter AB',
      id: 'v3',
      registration_number: 'GHI789',
      vehicle_id: 'VLUR4X20009048066'
    },
    {
      status: 'Online',
      owner_address: 'Balkvägen 12, 222 22 Stockholm',
      owner_name: 'Johans Bulk AB',
      id: 'v4',
      registration_number: 'JKL012',
      vehicle_id: 'YS2R4X20005388011'
    },
    {
      status: 'Online',
      owner_address: 'Balkvägen 12, 222 22 Stockholm',
      owner_name: 'Johans Bulk AB',
      id: 'v5',
      registration_number: 'MNO345',
      vehicle_id: 'YS2R4X20005387949'
    },
    {
      status: 'Offline',
      owner_address: 'Budgetvägen 1, 333 33 Uppsala',
      owner_name: 'Haralds Värdetransporter AB',
      id: 'v6',
      registration_number: 'PQR678',
      vehicle_id: 'VLUR4X20009048066'
    },
    {
      status: 'Offline',
      owner_address: 'Budgetvägen 1, 333 33 Uppsala',
      owner_name: 'Haralds Värdetransporter AB',
      id: 'v7',
      registration_number: 'STU901',
      vehicle_id: 'YS2R4X20005387055'
    }
  ];

  it('should return all items', () => {
    expect(pipe.transform(items, '')).toEqual(items);
  });

  it('should return []', () => {
    expect(pipe.transform(items, 'random')).toEqual([]);
  });

  it('should return only online items', () => {
    // --- Arrange
    const onlineItems = [
      {
        status: 'Online',
        owner_address: 'Cementvägen 8, 111 11 Södertälje',
        owner_name: 'Kalles Grustransporter AB',
        id: 'v1',
        registration_number: 'ABC123',
        vehicle_id: 'YS2R4X20005399401'
      },
      {
        status: 'Online',
        owner_address: 'Cementvägen 8, 111 11 Södertälje',
        owner_name: 'Kalles Grustransporter AB',
        id: 'v2',
        registration_number: 'DEF456',
        vehicle_id: 'VLUR4X20009093588'
      },
      {
        status: 'Online',
        owner_address: 'Cementvägen 8, 111 11 Södertälje',
        owner_name: 'Kalles Grustransporter AB',
        id: 'v3',
        registration_number: 'GHI789',
        vehicle_id: 'VLUR4X20009048066'
      },
      {
        status: 'Online',
        owner_address: 'Balkvägen 12, 222 22 Stockholm',
        owner_name: 'Johans Bulk AB',
        id: 'v4',
        registration_number: 'JKL012',
        vehicle_id: 'YS2R4X20005388011'
      },
      {
        status: 'Online',
        owner_address: 'Balkvägen 12, 222 22 Stockholm',
        owner_name: 'Johans Bulk AB',
        id: 'v5',
        registration_number: 'MNO345',
        vehicle_id: 'YS2R4X20005387949'
      },
    ];
    // --- Act & Assert
    expect(pipe.transform(items, 'Online')).toEqual(onlineItems);
  });

  it('should return only offline items', () => {
    // --- Arrange
    const offline = [
      {
        status: 'Offline',
        owner_address: 'Budgetvägen 1, 333 33 Uppsala',
        owner_name: 'Haralds Värdetransporter AB',
        id: 'v6',
        registration_number: 'PQR678',
        vehicle_id: 'VLUR4X20009048066'
      },
      {
        status: 'Offline',
        owner_address: 'Budgetvägen 1, 333 33 Uppsala',
        owner_name: 'Haralds Värdetransporter AB',
        id: 'v7',
        registration_number: 'STU901',
        vehicle_id: 'YS2R4X20005387055'
      }
    ];
    // --- Act & Assert
    expect(pipe.transform(items, 'Offline')).toEqual(offline);
  });

  it('should return items which have a search keyword', () => {
    // --- Arrange
    const targetItem = [
      {
        status: 'Online',
        owner_address: 'Cementvägen 8, 111 11 Södertälje',
        owner_name: 'Kalles Grustransporter AB',
        id: 'v2',
        registration_number: 'DEF456',
        vehicle_id: 'VLUR4X20009093588'
      }
    ];
    // --- Act & Assert
    expect(pipe.transform(items, 'DEF456')).toEqual(targetItem);
  });

  it('should return specific customers items', () => {
    // --- Arrange
    const customerItems = [
      {
        status: 'Online',
        owner_address: 'Balkvägen 12, 222 22 Stockholm',
        owner_name: 'Johans Bulk AB',
        id: 'v4',
        registration_number: 'JKL012',
        vehicle_id: 'YS2R4X20005388011'
      },
      {
        status: 'Online',
        owner_address: 'Balkvägen 12, 222 22 Stockholm',
        owner_name: 'Johans Bulk AB',
        id: 'v5',
        registration_number: 'MNO345',
        vehicle_id: 'YS2R4X20005387949'
      }
    ];
    // --- Act & Assert
    expect(pipe.transform(items, 'Johans Bulk AB')).toEqual(customerItems);
  });
});
