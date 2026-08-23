const STORAGE_KEY = "myStages";

const DB_NAME = "ZawajiDB";
const DB_VERSION = 2;
const IMAGE_STORE = "images";

// =====================
// إنشاء ID ثابت للمرحلة
// =====================

function createStageId() {

    if (
        typeof crypto !== "undefined" &&
        crypto.randomUUID
    ) {
        return crypto.randomUUID();
    }

    return (
        Date.now().toString(36) +
        Math.random().toString(36).substring(2)
    );
}

// =====================
// المراحل
// =====================

function getStages() {

    const data =
        localStorage.getItem(STORAGE_KEY);

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

        const request =
            indexedDB.open(
                DB_NAME,
                DB_VERSION
            );

        request.onupgradeneeded =
            function (event) {

                const db =
                    event.target.result;

                if (
                    !db.objectStoreNames.contains(
                        IMAGE_STORE
                    )
                ) {

                    db.createObjectStore(
                        IMAGE_STORE
                    );
                }
            };

        request.onsuccess =
            function () {

                resolve(
                    request.result
                );
            };

        request.onerror =
            function () {

                reject(
                    request.error
                );
            };
    });
}

// =====================
// حفظ الصورة الأصلية
// =====================

function saveStageImage(
    stageId,
    file
) {

    return new Promise(
        async (resolve, reject) => {

            try {

                const db =
                    await openImageDB();

                const transaction =
                    db.transaction(
                        IMAGE_STORE,
                        "readwrite"
                    );

                const store =
                    transaction.objectStore(
                        IMAGE_STORE
                    );

                store.put(
                    file,
                    String(stageId)
                );

                transaction.oncomplete =
                    function () {

                        db.close();

                        resolve();
                    };

                transaction.onerror =
                    function () {

                        db.close();

                        reject(
                            transaction.error
                        );
                    };

            } catch (error) {

                reject(error);
            }
        }
    );
}

// =====================
// جلب صورة المرحلة
// =====================

function getStageImage(stageId) {

    return new Promise(
        async (resolve, reject) => {

            try {

                const db =
                    await openImageDB();

                const transaction =
                    db.transaction(
                        IMAGE_STORE,
                        "readonly"
                    );

                const store =
                    transaction.objectStore(
                        IMAGE_STORE
                    );

                const request =
                    store.get(
                        String(stageId)
                    );

                request.onsuccess =
                    function () {

                        db.close();

                        resolve(
                            request.result ||
                            null
                        );
                    };

                request.onerror =
                    function () {

                        db.close();

                        reject(
                            request.error
                        );
                    };

            } catch (error) {

                reject(error);
            }
        }
    );
}

// =====================
// حذف صورة المرحلة
// =====================

function deleteStageImage(stageId) {

    return new Promise(
        async (resolve, reject) => {

            try {

                const db =
                    await openImageDB();

                const transaction =
                    db.transaction(
                        IMAGE_STORE,
                        "readwrite"
                    );

                const store =
                    transaction.objectStore(
                        IMAGE_STORE
                    );

                store.delete(
                    String(stageId)
                );

                transaction.oncomplete =
                    function () {

                        db.close();

                        resolve();
                    };

                transaction.onerror =
                    function () {

                        db.close();

                        reject(
                            transaction.error
                        );
                    };

            } catch (error) {

                reject(error);
            }
        }
    );
}