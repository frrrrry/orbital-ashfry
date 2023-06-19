import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default function UserPermissions() {
    const getCameraPermissions = async () => { 
        if (Constants.platform && Constants.platform.android) {
            const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

            if (status != "granted") {
                alert("We need permission to access your gallery.");
            }
        } 
    }
}