const STORAGE_KEY = "myStages";
const DB_NAME = "ZawajiDB";
const DB_VERSION = 1;
const IMAGE_STORE = "images";

// =====================
// المراحل - localStorage
// =====================

function getStages() {

    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
        return JSON.parse(data);
    }

    return [];
}

function saveStages(stages) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(stages)
    );
}

// =====================
// IndexedDB
// =====================

function openImageDB() {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(
            DB_NAME,
            DB_VERSION
        );

        request.onupgradeneeded = function (event) {

            const db = event.target.result;

            if (!db.objectStoreNames.contains(IMAGE_STORE)) {

                db.createObjectStore(
                    IMAGE_STORE
                );
            }
        };

        request.onsuccess = function () {

            resolve(request.result);
        };

        request.onerror = function () {

            reject(request.error);
        };
    });
}

// =====================
// حفظ الصورة الأصلية
// =====================

function saveStageImage(stageIndex, file) {

    return new Promise(async (resolve, reject) => {

        try {

            const db = await openImageDB();

            const transaction = db.transaction(
                IMAGE_STORE,
                "readwrite"
            );

            const store =
                transaction.objectStore(IMAGE_STORE);

            store.put(
                file,
                String(stageIndex)
            );

            transaction.oncomplete = function () {

                db.close();

                resolve();
            };

            transaction.onerror = function () {

                db.close();

                reject(transaction.error);
            };

        } catch (error) {

            reject(error);
        }
    });
}

// =====================
// جلب الصورة الأصلية
// =====================

function getStageImage(stageIndex) {

    return new Promise(async (resolve, reject) => {

        try {

            const db = await openImageDB();

            const transaction = db.transaction(
                IMAGE_STORE,
                "readonly"
            );

            const store =
                transaction.objectStore(IMAGE_STORE);

            const request =
                store.get(String(stageIndex));

            request.onsuccess = function () {

                db.close();

                resolve(request.result || null);
            };

            request.onerror = function () {

                db.close();

                reject(request.error);
            };

        } catch (error) {

            reject(error);
        }
    });
}

// =====================
// حذف صورة المرحلة
// =====================

function deleteStageImage(stageIndex) {

    return new Promise(async (resolve, reject) => {

        try {

            const db = await openImageDB();

            const transaction = db.transaction(
                IMAGE_STORE,
                "readwrite"
            );

            const store =
                transaction.objectStore(IMAGE_STORE);

            store.delete(String(stageIndex));

            transaction.oncomplete = function () {

                db.close();

                resolve();
            };

            transaction.onerror = function () {

                db.close();

                reject(transaction.error);
            };

        } catch (error) {

            reject(error);
        }
    });
}