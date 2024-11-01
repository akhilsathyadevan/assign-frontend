import axiosInstance from "./axiosInterceptor";
export const createEvents = async(eventData)=>{
    try {
        console.log('............',eventData);
        
        const response = await axiosInstance.post("/event",eventData);
        return response.data; 
      } catch (error) {
        console.error('Error caught:', error);
      }
}
