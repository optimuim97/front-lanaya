<script setup>
import { uploadService } from "@/services/Upload/uploadService.js";
import updateUser from "@/services/User/updateUser";
import { defineProps, onMounted, ref, watch } from "vue";
import { toast } from "vue3-toastify";

// Props
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});

// File Upload Service
const { uploadFiles, path, uploadStatus, uploadError, statusCode } = uploadService();

// Reactive form data and avatar preview
const formData = ref({
  name: "",
  email: "",
  phone: "",
  photo: "",
});

const avatarPreview = ref(null);
const selectedFiles = ref(null);

// Handle file selection and preview
const onFileChange = async (event) => {
  // const files = event.target.files;
  selectedFiles.value = event.target.files;

  if (!selectedFiles.value || selectedFiles.value.length === 0) {
    uploadError.value = "No files selected!";
    return;
  }

  console.log("Event ->>>>>>>>>>>>>>>");
  const file = event.target.files[0];

  console.log({ file__: file });

  // Preview the selected file
  avatarPreview.value = URL.createObjectURL(file);

  try {
    // Upload the file
    await uploadFiles(file);
  } catch (error) {
    console.error("File upload failed", error);
  }
};

// Initialize form data on mount
onMounted(() => {
  formData.value = { ...props.user };
});

watch(statusCode, (newStatus) => {
  switch (newStatus) {
    case 200:
      toast.success("Image mise à jour");
      // alert(path.value);
      console.log(path.value);
      // avatarPreview.value = path.value.uploaded_files[0];

      // alert(
      //   avatarPreview?.value !== null &&
      //     avatarPreview?.value !== "" &&
      //     typeof avatarPreview?.value != "undefined"
      // );

      // console.log({ update: avatarPreview.value });
      // setTimeout(() => {
      //   router.push({
      //     name: "Dashboard",
      //   });
      // }, 1500);
      break;
    case 201:
      toast.success("Image mise à jour");
      break;
    case 400:
      toast.error("La requête est mal formée.");
      statusCode.value = null;
      break;
    case 401:
      toast.error("Identifiants incorrects.");
      statusCode.value = null;
      break;
    case 403:
      toast.error("  Accès refusé.");
      statusCode.value = null;
      break;
    case 404:
      toast.error("La ressource demandée n'existe pas.");
      statusCode.value = null;
      break;
    case 422:
      statusCode.value = null;
      break;
    case 500:
      toast.error("Une erreur interne est survenue.");
      statusCode.value = null;
      break;
    default:
      console.log(`Erreur inconnue - Code : ${newStatus}`);
  }
});

watch(uploadError, (newError) => {
  toast.error(newError);
});

watch(uploadStatus, (newSucess) => {
  toast.error(newSucess);
});

const { update } = updateUser();
</script>

<template>
  <div class="account-content" id="general">
    <!-- Avatar Upload and Preview -->
    <div class="avatar-wrapper">
      <div class="avatar-content">
        <div class="avatar">
          <!-- Preview selected image or display default avatar -->
          <!-- &&
          typeof avatarPreview?.value != 'undefined' -->
          <!-- `${'http://localhost:8000/images/' + props?.user?.photo}` || -->
          <!-- `${'http://localhost:8000/images/' + props?.user?.photo}` || -->
          <!-- <p>
            {{ props?.user?.photo }}
          </p> -->

          <img v-if="avatarPreview !== null" :src="avatarPreview" alt="if" />

          <img
            v-else-if="
              (avatarPreview?.value == null &&
                avatarPreview?.value == '' &&
                props?.user?.photo == '') ||
              props?.user?.photo == null
            "
            src="@/assets/images/profile.png"
            alt="elseif"
          />

          <img
            v-else
            :src="`${'http://localhost:8000/images/' + props?.user?.photo}`"
            alt="else"
          />
        </div>

        <div class="avatar-content__guideline">
          <h6>
            Votre Profil
            <!-- <p>{{ avatarPreview ==  ?? "-------" }}</p> -->

            <!-- {{ 'http://localhost:8000/images/' + props?.user?.photo }} -->
          </h6>
          <p>Profil taille: 400px x 400px</p>
        </div>
      </div>

      <!-- File input for avatar -->
      <form>
        <input
          type="file"
          name="avatar_upload"
          id="avatarUpload"
          @change="onFileChange"
        />
        <label for="avatarUpload">Choisir Photo</label>
      </form>
    </div>

    <!-- User Info Form -->
    <form @submit.prevent="update(formData)">
      <div class="row">
        <div class="col-sm-12">
          <div class="input input--secondary">
            <label for="saveFirstName">Speudo</label>
            <input
              v-model="formData.name"
              type="text"
              id="saveFirstName"
              placeholder="Speudo"
              required
            />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">
          <div class="input input--secondary">
            <label for="saveEmail">Email</label>
            <input
              v-model="formData.email"
              type="email"
              id="saveEmail"
              placeholder="Enter Your Email"
              disabled
            />
          </div>
        </div>
      </div>

      <div>
        <button type="submit" class="button button--effect">Mettre à jour</button>
      </div>
    </form>
  </div>
</template>
