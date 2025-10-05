import { p256 } from './noble-curves.min.js';
import { EccKey } from './ecc_key.js';

export class ElGamal {
    static encrypt(affineMessagePoint, affinePublicKey) {
        const messagePoint = new p256.ProjectivePoint(affineMessagePoint.x, affineMessagePoint.y, 1n);
        const publicKey = new p256.ProjectivePoint(affinePublicKey.x, affinePublicKey.y, 1n);
        const ephemeralKey = EccKey.randomScalar();

        const point1 = p256.ProjectivePoint.BASE.multiply(ephemeralKey);
        const sharedSecret = publicKey.multiply(ephemeralKey);
        const point2 = messagePoint.add(sharedSecret);

        return {
            point1: point1.toAffine(),
            point2: point2.toAffine()
        };
    }

    static decrypt({ point1, point2 }, privateKey) {
        const projectivePoint1 = new p256.ProjectivePoint(point1.x, point1.y, 1n);
        const projectivePoint2 = new p256.ProjectivePoint(point2.x, point2.y, 1n);

        const sharedSecret = projectivePoint1.multiply(privateKey);
        return projectivePoint2.subtract(sharedSecret).toAffine();
    }
}
