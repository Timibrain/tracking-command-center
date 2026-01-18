export interface CourierPosition {
    id: number;
    order_id: string;
    courier_id: string;
    latitude: number;
    longitude: number;
    heading: number; // Crucial for rotating the 3D model correctly
    speed: number;
    updated_at: string;
}

export interface Order {
    id: string;
    user_id: string;
    status: 'calculating' | 'transit' | 'delivered' | 'cancelled';
    restaurant_name: string;
    destination_lat: number;
    destination_lng: number;
    created_at: string;
}