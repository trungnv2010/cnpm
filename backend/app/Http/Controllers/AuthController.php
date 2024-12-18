<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Mail\OtpMail;
use App\Models\Otp;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Models\Cart;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {

            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;
            $user->update(['active_session' => $token]);

            return response()->json([
                'access_token' => $token,
                'token_type' => 'Bearer',
                'role' => $user->role->name,
                'name' => $user->name,
                'uid' => $user->id,

            ]);
        }

        return response()->json(['message' => 'Tài khoản mật khẩu không đúng', 'code' => '401'], 401);
    }


    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'phone' => 'required|string',
            'role_id' => '3'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors(), 'code' => '422'], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'role_id' => $request->role_id ?? '3',
        ]);

        $cart = new Cart();
        $cart->user_id = $user->id;
        $cart->save();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'code' => '200',
            'message' => 'Đăng ký thành công',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }
    public function sendOtp(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'otp' => 'required|digits:6', // Yêu cầu OTP phải là 6 chữ số
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors(), 'code' => '422'], 422);
        }

        // Xóa mã OTP cũ nếu tồn tại cho email này
        Otp::where('email', $request->email)->delete();

        // Lưu mã OTP vào cơ sở dữ liệu với thời gian hết hạn (ví dụ: 5 phút)
        Otp::create([
            'email' => $request->email,
            'otp' => $request->otp,
            'expires_at' => Carbon::now()->addMinutes(5),
        ]);

        // Gửi mã OTP qua email
        Mail::to($request->email)->send(new OtpMail($request->otp));

        return response()->json(['message' => 'OTP đã gửi về email của bạn.', 'code' => '200']);
    }
    public function changePassword(Request $request)
    {
        // Xác thực dữ liệu đầu vào
        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = Auth::user();

        // Kiểm tra mật khẩu hiện tại có khớp với mật khẩu đã lưu trong cơ sở dữ liệu không
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['error' => 'Mật khẩu hiện tại không chính xác', 'code' => '403'], 403);
        }

        // Cập nhật mật khẩu mới
        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Đổi mật khẩu thành công', 'code' => '200']);
    }

    public function checkEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);
        $emailExits = User::where('email', $request->email)->exists();
        if ($emailExits) {
            return response()->json([
                'message' => 'Email đã tồn tại',
                'code' => '403'
            ]);
        } else {
            return response()->json([
                'message' => 'Email chưa tồn tại',
                'code' => '200'
            ]);
        }
    }
    public function checkPhone(Request $request)
    {
        $request->validate([
            'phone' => 'required'
        ]);
        $phoneExits = User::where('phone', $request->phone)->exists();
        if ($phoneExits) {
            return response()->json([
                'message' => 'Số điện thoại đã tồn tại',
                'code' => '403'
            ]);
        } else {
            return response()->json([
                'message' => 'Số điện thoại chưa tồn tại',
                'code' => '200'
            ]);
        }
    }
}
