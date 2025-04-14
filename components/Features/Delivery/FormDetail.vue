<script setup lang="ts">
import type { TArmadaItem } from "@/app/models/ArmadaModel";
import type { TDriverItem } from "@/app/models/DriverModel";
import { useArmadaStore } from "@/app/stores/useArmadaStore";
import { useDeliveryStore } from "@/app/stores/useDeliveryStore";
import { useDriverStore } from "@/app/stores/useDriverStore";
const route = useRoute();
const router = useRouter();
const driverController = useDriverStore();
const armadaController = useArmadaStore();
const deliveryController = useDeliveryStore();
const controller = useDeliveryStore();

const deliveryId = route.params.id;
await deliveryController.getById(+deliveryId);
await armadaController.getAll();
await driverController.getAll();

const armadaSelected = ref<TArmadaItem>(
    armadaController.lists.find(
        (i) => i.id === deliveryController.detail.armadaId
    )!
);
const driverSelected = ref<TDriverItem>(
    driverController.lists.find(
        (i) => i.id == deliveryController.detail.driverId
    )!
);
const codriverSelected = ref<TDriverItem>(
    driverController.lists.find(
        (i) => i.id == deliveryController.detail.codriverId
    )!
);
</script>
<template>
    <div>
        <div class="mb-2">
            <UiButton
                @click="router.push('/admin/delivery')"
                variant="outline"
                type="button"
            >
                <Icon name="solar:arrow-left-linear" class="mr-2" /> Back
            </UiButton>
        </div>
        <div class="p-3 border rounded-lg">
            <div class="text-sm uppercase font-bold mb-2">File Evidence</div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
                <div
                    v-for="item in controller.detail.bukti_pengiriman"
                    class="border p-2 aspect-video w-full"
                >
                    <img
                        class="w-full h-full object-contain"
                        :src="toAssetLink(item.image)"
                        alt="image"
                    />
                </div>
            </div>
        </div>
        <div class="space-y-3 mt-4">
            <div class="grid md:grid-cols-3">
                <UiFormField
                    v-slot="{ componentField }"
                    name="quantity"
                    :model-value="deliveryController.detail.quantity"
                >
                    <UiFormItem>
                        <UiFormLabel>INPUT QUANTITY (ℓ)</UiFormLabel>
                        <UiFormControl>
                            <UiInput
                                placeholder="16.000"
                                data-maska-tokens="9:[0-9]:repeated"
                                data-maska-reversed
                                v-maska
                                data-maska="9.99#.###"
                                type="text"
                                v-bind="componentField"
                            />
                        </UiFormControl>
                        <UiFormMessage />
                    </UiFormItem>
                </UiFormField>
            </div>
            <div class="grid md:grid-cols-3 gap-3">
                <div>
                    <div class="my-3 p-3 border rounded-lg">
                        <div class="text-sm uppercase font-bold mb-2">
                            Info Armada
                        </div>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                            <img
                                class="rounded-md aspect-square object-contain border"
                                :src="toAssetLink(armadaSelected?.image_front)"
                                alt=""
                            />
                            <img
                                class="rounded-md aspect-square object-contain border"
                                :src="toAssetLink(armadaSelected?.image_back)"
                                alt=""
                            />
                            <img
                                class="rounded-md aspect-square object-contain border"
                                :src="toAssetLink(armadaSelected?.image_left)"
                                alt=""
                            />
                            <img
                                class="rounded-md aspect-square object-contain border"
                                :src="toAssetLink(armadaSelected?.image_right)"
                                alt=""
                            />
                        </div>
                        <div class="flex">
                            <div class="w-32 shrink-0 text-sm">MERK</div>
                            <div class="flex-1 text-sm font-bold">
                                : {{ armadaSelected.merk }}
                            </div>
                        </div>
                        <div class="flex">
                            <div class="w-32 shrink-0 text-sm">NOPOL</div>
                            <div class="flex-1 text-sm font-bold">
                                : {{ armadaSelected.nopol }}
                            </div>
                        </div>
                        <div class="flex">
                            <div class="w-32 shrink-0 text-sm">QUANTITY</div>
                            <div class="flex-1 text-sm font-bold">
                                : {{ armadaSelected.quantity }}
                            </div>
                        </div>
                        <a
                            class="text-sm font-bold text-blue-500"
                            :href="toAssetLink(armadaSelected.terra_doc)"
                            target="_blank"
                            rel="noopener noreferrer"
                            >View Document</a
                        >
                    </div>
                </div>
                <div>
                    <div
                        v-if="driverSelected"
                        class="my-3 border rounded-md p-3"
                    >
                        <div class="text-sm uppercase font-bold mb-2">
                            Info Driver
                        </div>
                        <div class="gap-3 items-center">
                            <div class="aspect-[3/4] w-32 mx-auto mb-4">
                                <img
                                    class="rounded-md w-full h-full border object-contain"
                                    :src="toAssetLink(driverSelected?.image)"
                                    alt=""
                                />
                            </div>
                            <div class="flex-1">
                                <div class="flex">
                                    <div class="w-32 shrink-0 text-sm">
                                        NAME
                                    </div>
                                    <div class="flex-1 text-sm font-bold">
                                        : {{ driverSelected.name }}
                                    </div>
                                </div>
                                <div class="flex">
                                    <div class="w-32 shrink-0 text-sm">
                                        PHONE
                                    </div>
                                    <div class="flex-1 text-sm font-bold">
                                        : {{ driverSelected.phone }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        v-if="codriverSelected"
                        class="my-3 border rounded-md p-3"
                    >
                        <div class="text-sm uppercase font-bold mb-2">
                            Info Co Driver
                        </div>
                        <div class="gap-3 items-center">
                            <div class="aspect-[3/4] w-32 mx-auto mb-4">
                                <img
                                    class="rounded-md w-full h-full border object-contain"
                                    :src="toAssetLink(codriverSelected?.image)"
                                    alt=""
                                />
                            </div>
                            <div class="flex-1">
                                <div class="flex">
                                    <div class="w-32 shrink-0 text-sm">
                                        NAME
                                    </div>
                                    <div class="flex-1 text-sm font-bold">
                                        : {{ codriverSelected.name }}
                                    </div>
                                </div>
                                <div class="flex">
                                    <div class="w-32 shrink-0 text-sm">
                                        PHONE
                                    </div>
                                    <div class="flex-1 text-sm font-bold">
                                        : {{ codriverSelected.phone }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="font-semibold">
                Delivery Code : {{ deliveryController.detail.code }}
            </div>
            <div class="space-y-3">
                <div class="grid md:grid-cols-2 gap-3">
                    <UiFormField v-slot="{ componentField }" name="phone" :model-value="deliveryController.detail.phone">
                        <UiFormItem>
                            <UiFormLabel>Phone</UiFormLabel>
                            <UiFormControl>
                                <UiInput
                                    type="tel"
                                    placeholder="phone..."
                                    v-bind="componentField"
                                />
                            </UiFormControl>
                            <UiFormMessage />
                        </UiFormItem>
                    </UiFormField>
                    <UiFormField
                        v-slot="{ componentField }"
                        name="nama_penerima"
                        :model-value="deliveryController.detail.nama_penerima"
                    >
                        <UiFormItem>
                            <UiFormLabel>Name</UiFormLabel>
                            <UiFormControl>
                                <UiInput
                                    type="text"
                                    placeholder="name..."
                                    v-bind="componentField"
                                />
                            </UiFormControl>
                            <UiFormMessage />
                        </UiFormItem>
                    </UiFormField>
                </div>
                <UiFormField
                    v-slot="{ componentField }"
                    name="tujuan"
                    :model-value="deliveryController.detail.tujuan"
                >
                    <UiFormItem>
                        <UiFormLabel>Address</UiFormLabel>
                        <UiFormControl>
                            <UiTextarea
                                disabled
                                readonly
                                rows="5"
                                placeholder="Address..."
                                v-bind="componentField"
                            />
                        </UiFormControl>
                        <UiFormMessage />
                    </UiFormItem>
                </UiFormField>
            </div>
        </div>
        <div class="my-3 border rounded-xl p-5">
            <h2 class="text-xl font-semibold mb-2">Progres Pengiriman</h2>
            <div
                class="flex py-3 border-b"
                v-for="(item, index) in controller.detail.progress_pengiriman"
                :key="item.id"
            >
                <div class="w-5">-</div>
                <div class="text-sm font-bold">
                    {{ item.description }}
                    -
                    {{
                        $dayjs(item.createdAt).format("DD MMMM YYYY HH: mm:ss")
                    }}
                </div>
            </div>
        </div>
    </div>
</template>
